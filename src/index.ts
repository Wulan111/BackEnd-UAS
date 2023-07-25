import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import visitorRouter from "./routes/visitorRouter";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from './user';

// Membuat koneksi ke database MongoDB
const app = express();
const port = 3006; // Ganti dengan port yang ingin Anda gunakan
app.use(express.json());
app.use(cors());

// app.use('/users', userRouter);
app.use('/visitors', visitorRouter);

const dbUrl = "mongodb://127.0.0.1/users";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Koneksi MongoDB berhasil");
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Koneksi MongoDB gagal", err);
  });

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Define the user model
const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, 'secretKey');

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
