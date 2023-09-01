import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    console.log(userId);

    const q =
      useIrd !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = $1 ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= $1 OR p.userId = $2
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId, userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result.rows);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    const insertQuery = "INSERT INTO posts(description, img, created_at, user_id) VALUES ($1, $2, $3, $4)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    const deleteQuery = "DELETE FROM posts WHERE id=$1 AND user_id=$2";

    db.query(deleteQuery, [req.params.id, userInfo.id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.rowCount > 0)
        return res.status(200).send("Post has been deleted.");
      return res.status(403).send("You can delete only your post");
    });
  });
};
