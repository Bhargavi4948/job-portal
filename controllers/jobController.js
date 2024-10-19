const Job = require('../models/job');
const nodemailer = require('nodemailer');

const postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate } = req.body;
    const company = req.company;

    const job = new Job({ title, description, experienceLevel, endDate, company: company._id });
    await job.save();
    res.send({ message: 'Job posted successfully', job });
};

const addCandidate = async (req, res) => {
    const { jobId, email } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).send('Job not found');

    job.candidates.push({ email });
    await job.save();

    // Sending email (using nodemailer)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Job Alert - ${job.title}`,
        text: `You're receiving this email because a job has been posted: ${job.title} by ${req.company.name}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.send({ message: 'Candidate added and email sent', job });
    });
};

module.exports = { postJob, addCandidate };
