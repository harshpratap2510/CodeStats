import express from 'express';
import {User} from '../models/User.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For token generation
import LeetCode from 'leetcode-query';
import axios from 'axios';  






  const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
   
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
   
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }
   
      const hashedPassword = await bcrypt.hash(password, 10);
   
      const user = await User.create({ username, email, password: hashedPassword, });
  
      console.log(user);
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find by either email or username
      const user = await User.findOne({ 
        $or: [{ email }, { username: email }] // `email` field in req.body could also be a username
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 3600000 * 24, 
      });
  
      res.status(200).json({ message: 'Login successful', token });
  
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  
    

 
  

const logoutUser = async (req, res) => {
  try {
    // Clear the cookie using the same options it was set with
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',        // must match the original path
    });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Error logging out' });
  }
};


// In your user controller (add this function)
const getUserProfile = async (req, res) => {
  try {
      const token = req.cookies.jwt;
      if (!token) {
          return res.status(401).json({ message: 'Not authorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id); // Assuming `id` is saved in the token

      if (!user) {
          return res.status(404).json({ message: 'User data not found' });
      }

      res.status(200).json({ user });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching user profile' });
  }
};


const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, email, leetcodeHandle, codechefHandle, codeforcesHandle, gfgHandle, profilePicture } = req.body;

    // Update fields - explicitly check for undefined to allow empty strings
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    
    // Handle platform usernames - allows clearing by sending empty string
    if (leetcodeHandle !== undefined) user.leetcodeHandle = leetcodeHandle;
    if (codechefHandle !== undefined) user.codechefHandle = codechefHandle;
    if (codeforcesHandle !== undefined) user.codeforcesHandle = codeforcesHandle;
    if (gfgHandle !== undefined) user.gfgHandle = gfgHandle;

    // Handle profile picture - can be cleared by sending empty string
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        username: user.username,
        email: user.email,
        leetcodeHandle: user.leetcodeHandle,
        codechefHandle: user.codechefHandle,
        codeforcesHandle: user.codeforcesHandle,
        gfgHandle: user.gfgHandle,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
      const users = await User.find({}, '-password'); // Exclude password field
      res.status(200).json({ users });
  } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ message: 'Error fetching all users' });
  }
};





export { createUser, loginUser, logoutUser, getUserProfile, updateProfile, getAllUsers };