// import cookieParser from "cookie-parser";
// import cors from "cors";
// import express from "express";
// import multer from "multer";
// import authRoutes from "./routes/auth.js";
// import commentRoutes from "./routes/comments.js";
// import likeRoutes from "./routes/likes.js";
// import postRoutes from "./routes/posts.js";
// // import relationshipRoutes from "./routes/relationships.js";
// import userRoutes from "./routes/users.js";
// const app = express();

// //middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
// // app.use("/api/relationships", relationshipRoutes);

// app.listen(8800, () => {
//   console.log("API working!");
// });




import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
// import relationshipRoutes from "./routes/relationships.js";
import userRoutes from "./routes/users.js";

// Initialize Express app
const app = express();

// Middleware for CORS and parsing cookies
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Middleware for handling CORS preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
app.post("/api/upload", upload.single("file"), (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ filename: file.filename });
  } catch (error) {
    console.error("Upload Error:", error);
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
// app.use("/api/relationships", relationshipRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
