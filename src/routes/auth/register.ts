import bcrypt from 'bcrypt';
import User from '../../user';
import { application } from 'express';
import user from '../../user';

application.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser= new User({name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  