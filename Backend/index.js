const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/UserModel");
const Post = require("./models/PostModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const clodinary = require("cloudinary").v2;

const cloudinaryConnection = (req, res, next) => {
  try {
    clodinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Blog App
 * ----- post -> title, desscriptiion, image, likes, comments
 * ----- user register -> first name, last name, dob, pic, mobile number, email, password, confirm password
 * ----- login -> phone or email and password
 *
 */

app.get("/", (req, res) => {
  res.json("Chalo ji Ho gaya server start");
});

app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // const checkUser = await User.findOne({ userName });
    // if (checkUser) {
    //   return res.status(400).json({ error: "User Already Exists" });
    // }

    // if(!userName || !password){
    //     return res.status(400).json({error: "Please fill all the fields"})
    // }

    // if(password.length < 6){
    //     return res.status(400).json({error: "Password must be 6 character long"})
    // }
    // if(password.length > 15){
    //     return res.status(400).json({error: "Password must be 15 character long"})
    // }

    const user = await User.create({ userName, password: hash });
    res.status(200).json({
      message: "User Created Successfully",
      id: user._id,
      userName: user.userName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  const checkUser = await User.findOne({ userName });
  if (!checkUser) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { userName, id: checkUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  res.cookie("token", token).status(200).json({
    message: "Login Successfull",
    id: checkUser._id,
    userName: checkUser.userName,
  });
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    res.status(200).json({ id: user._id, userName: user.userName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successfull" });
});

app.post("/add-post", upload.single("image"), async (req, res) => {
  try {
    const { originalname, filename } = req.file;

    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const oldPath = `uploads/${filename}`;
    const newPath = `uploads/${filename}.${extension}`;
    fs.renameSync(oldPath, newPath);

    const result = await clodinary.uploader.upload(newPath, {
      folder: "blog",
      use_filename: true,
      unique_filename: false,
    });
    fs.unlinkSync(newPath);
    const url = result.secure_url;

    const { title, subDescription, content } = req.body;

    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    const post = await Post.create({
      title,
      subDescription,
      content,
      image: url,
      author: user,
    });
    res
      .status(200)
      .json({ message: "Post Created Successfully", id: post._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/add-post", upload.single("image"), async (req, res) => {
    try {

        let newPath = null;

        if(req.file){
            const { originalname, filename } = req.file;

            const parts = originalname.split(".");
            const extension = parts[parts.length - 1];
            const oldPath = `uploads/${filename}`;
             newPath = `uploads/${filename}.${extension}`;
            fs.renameSync(oldPath, newPath);

            const result = await clodinary.uploader.upload(newPath, {
            folder: "blog",
            use_filename: true,
            unique_filename: false,
            });
            fs.unlinkSync(newPath);
            const url = result.secure_url;
            req.body.image = url;
        }
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            return res.status(400).json({error: "Please Login First"})
        }

        let post = await Post.findById(req.body.id);
        
        const user = await User.findById(payload.id);
        const checkUser = JSON.stringify(post.author._id)  === JSON.stringify(user._id);

        if(!checkUser){
            return res.status(400).json({error: "You are not allowed to edit this post"})
        }
        const { title, subDescription, content, image } = req.body;

          post = await Post.findByIdAndUpdate(req.body.id, {
            title,
            subDescription,
            content,
            image,
        }); 
        res.status(200).json({ message: "Post Updated Successfully" });

    
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    }
);


app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "userName")
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/post/:id", async (req, res) => {
    try {
        

        const post = await Post.findById(req.params.id).populate(
            "author",
            "userName"
            );
            res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }
);

app.delete("/post/:id", async (req, res) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            return res.status(400).json({error: "Please Login First"})
        }

        const post = await Post.findById(req.params.id);
        
        const user = await User.findById(payload.id);
        const checkUser = JSON.stringify(post.author._id)  === JSON.stringify(user._id);

        if(!checkUser){
            return res.status(400).json({error: "You are not allowed to delete this post"})
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post Deleted Successfully" });

    
    } catch (error) {
        res.status(500).json({  message: "You are not admin of this post" });
    }
    }
);


app.get("/verify/:id", async (req, res) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            return res.status(400).json({error: "Please Login First"})
        }

        const post = await Post.findById(req.params.id);
        
        const user = await User.findById(payload.id);
        const checkUser = JSON.stringify(post.author._id)  === JSON.stringify(user._id);

        if(!checkUser){
            return res.status(400).json({error: "You are not allowed to edit this post"})
        }
        res.status(200).json({ message: "You are admin of this post" });

    
    } catch (error) {
        res.status(500).json({  message: "You are not admin of this post" });
    }
    }
);



app.listen(PORT, () => {
  cloudinaryConnection();
  connectDb();
  console.log("server started");
});
