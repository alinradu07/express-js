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

//@desc Get all posts
//@route GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

//@desc Get single post
//@route GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
  //res.status(200).json(posts.filter((post) => post.id === id));
};

//@desc Create new post
//@route POST /api/posts/
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

//@desc Update post
//@route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  //   console.log(req.body);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  //   const updatedPost = { ...post, ...req.body };
  //   console.log(updatedPost);
  //   posts[id] = updatedPost;

  post.title = req.body.title;
  console.log(posts);
  res.status(200).json(posts);
};

//@desc Delete post
//@route DELETE /api/posts/:id
export const deletePost = (req, res) => {
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
};
