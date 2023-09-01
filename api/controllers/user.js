import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT id, username, email, name, city, website, profilepic, coverpic FROM users WHERE id = $1";

  db.query(q, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = result.rows[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const updateQuery =
      "UPDATE users SET name=$1, city=$2, website=$3, profilepic=$4, coverpic=$5 WHERE id=$6";

    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      userInfo.id,
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) res.status(500).json(err);
      if (result.rowCount > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your profile!");
    });
  });
};
