const { getCommentById } = require("../services/articlesServices");

const commentsController = require("express").Router();

// get comment by id;
commentsController.get("/:id", async (req, res) => {
  console.log("we reach");
  try {
    const comment = await getCommentById(req.params.id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.status(200).json(comment);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: articlesController.js:63 ~ articlesController.post ~ post:"
    );
    console.error("error is " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = commentsController;
