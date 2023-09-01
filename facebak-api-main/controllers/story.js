import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    const q = `SELECT s.*, name FROM stories AS s 
    JOIN users AS u ON (u.id = s.user_id)
    LEFT JOIN relationships AS r ON (s.user_id = r.followed_user_id AND r.follower_user_id = \$1) 
    LIMIT 4`;

    db.query(q, [userInfo.id], (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result.rows);
    });
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    const insertQuery = "INSERT INTO stories(img, created_at, user_id) VALUES (\$1, \$2, \$3);";
    const values = [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json("Story has been created.");
    });
  });
};

export const deleteStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).send("Token is not valid!");

    const deleteQuery = "DELETE FROM stories WHERE id = \$1 AND user_id = \$2";

    db.query(deleteQuery, [req.params.id, userInfo.id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.rowCount > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your story!");
    });
  });
};
