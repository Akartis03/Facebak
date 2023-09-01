import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id = $1";

  db.query(q, [req.query.postId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.rows.map(like => like.user_id));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const insertQuery = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.postId
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

export const deleteLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const deleteQuery = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2";

    db.query(deleteQuery, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};
