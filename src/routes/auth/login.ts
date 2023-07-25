import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../../user';
import { application } from 'express';

application.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } 
  });
  