const Company = require('../models/company');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const registerCompany = async (req, res) => {
    const { name, email, password, mobile } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).send('Company already registered.');

    const newCompany = new Company({ name, email, password, mobile });
    await newCompany.save();

    const token = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, message: 'Company registered. Please verify your account via the email sent.' });
};

const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company || !(await company.matchPassword(password))) {
        return res.status(400).send('Invalid credentials');
    }

    if (!company.isVerified) {
        return res.status(401).send('Please verify your email first.');
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true });
    res.send({ message: 'Logged in successfully', token });
};

const logoutCompany = (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully');
};

module.exports = { registerCompany, loginCompany, logoutCompany };
