import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const q = "SELECT follower_user_id FROM relationships WHERE followed_user_id = $1";

  db.query(q, [req.query.followedUserId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.rows.map(relationship => relationship.follower_user_id));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const insertQuery = "INSERT INTO relationships (follower_user_id, followed_user_id) VALUES ($1, $2)";
    const values = [
      userInfo.id,
      req.body.userId
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const deleteQuery = "DELETE FROM relationships WHERE follower_user_id = $1 AND followed_user_id = $2";

    db.query(deleteQuery, [userInfo.id, req.query.userId], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};
