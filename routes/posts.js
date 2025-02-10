import { Router } from "express";

const router = Router();
let posts = [
  {
    id: 1,
    title: "Post One",
    description: "description 1",
  },
  {
    id: 2,
    title: "Post Two",
    description: "description 2",
  },
  {
    id: 3,
    title: "Post Three",
    description: "description 3",
  },
];

//Get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

//Get single post
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    return next(error);
  }
  res.status(200).json(post);
  //res.status(200).json(posts.filter((post) => post.id === id));
});

//Create new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    return res.status(400).json({ msj: "Please include a title" });
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

//Update Post
router.put("/:id", (req, res) => {
  //   console.log(req.body);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }
  //   const updatedPost = { ...post, ...req.body };
  //   console.log(updatedPost);
  //   posts[id] = updatedPost;

  post.title = req.body.title;
  console.log(posts);
  res.status(200).json(posts);
});

//Delete Post
router.delete("/:id", (req, res) => {
  //   console.log(req.body);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }
  //   const updatedPost = { ...post, ...req.body };
  //   console.log(updatedPost);
  //   posts[id] = updatedPost;
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router;
