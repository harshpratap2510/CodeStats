import express from 'express';
import jwt from 'jsonwebtoken';
// import { Admin } from '../models/User.js';
import bcrypt from 'bcryptjs'; // For password hashing

const createAdmin = async (req, res) => {
    try { 
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ username, email, password: hashedPassword });
        res.status(201).json({ admin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin' });
    }
}; 

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Set to true if using HTTPS
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {   
        res.status(500).json({ message: 'Error logging in' });
    } 
};

const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out' });
    }
};  


export { createAdmin, loginAdmin, logoutAdmin };