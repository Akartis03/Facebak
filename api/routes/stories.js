import express from "express";
import { getStories, addStory, deleteStory } from "../controllers/story.js";

const routerStorie = express.Router();

routerStorie.get("/", getStories);
routerStorie.post("/", addStory);
routerStorie.delete("/:id", deleteStory);

export default routerStorie;
