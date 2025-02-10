import express from "express";
import path from "node:path";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
const port = process.env.PORT || 8000;

const app = express();

//Body parser middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

//Routers
app.use("/api/posts", posts);
//Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
