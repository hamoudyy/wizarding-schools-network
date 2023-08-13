"use strict";

const router = require("express").Router();
const { WizardingSchool, Student } = require('../db/index');

// Wrap route handlers with try-catch for error handling
const tryCatchWrapper = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (err) {
        next(err);
    }
};

// Wizarding Schools Routes

// Get all wizarding schools
router.get('/wizarding-schools', tryCatchWrapper(async (req, res) => {
    const wizardingSchools = await WizardingSchool.findAll();
    res.send(wizardingSchools);
}));

// Get a single wizarding school by id, including students
router.get('/wizarding-schools/:id', tryCatchWrapper(async (req, res) => {
    const school = await WizardingSchool.findByPk(req.params.id, {
        include: Student,
    });
    res.send(school);
}));

// Add a new wizarding school
router.post("/wizarding-schools", tryCatchWrapper(async (req, res) => {
    try {
        // Check if the school already exists
        const checkSchool = await WizardingSchool.findOne({ where: { name: req.body.name } });
        if (checkSchool) {
            res.status(400).json({ message: "School already exists" });
        } else {
            // Create the new school
            const school = await WizardingSchool.create(req.body);
            res.status(201).json(school);
        }
    } catch (err) {
        next(err);
    }
}));

// Delete a wizarding school by id
router.delete("/wizarding-schools/:id", tryCatchWrapper(async (req, res) => {
    try {
        await WizardingSchool.destroy({ where: { id: req.params.id } });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}));

// Update a wizarding school by id
router.put("/wizarding-schools/:id", tryCatchWrapper(async (req, res) => {
    try {
        // Check if the school exists
        const checkSchool = await WizardingSchool.findOne({ where: { name: req.body.name } });
        if (!checkSchool) {
            res.status(400).json({ message: "School not found" });
        } else {
            // Update the school
            const school = await WizardingSchool.findByPk(req.params.id);
            await school.update(req.body);
            res.send(school);
        }
    } catch (err) {
        next(err);
    }
}));

// Students Routes

// Get all students
router.get('/students', tryCatchWrapper(async (req, res) => {
    const students = await Student.findAll();
    res.send(students);
}));

// Get a single student by id, including wizarding school
router.get('/students/:id', tryCatchWrapper(async (req, res) => {
    const student = await Student.findByPk(req.params.id, {
        include: WizardingSchool,
    });
    res.send(student);
}));

// Add a new student
router.post("/students", tryCatchWrapper(async (req, res) => {
    try {
        // Create the new student
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        next(err);
    }
}));

// Delete a student by id
router.delete("/students/:id", tryCatchWrapper(async (req, res) => {
    try {
        await Student.destroy({ where: { id: req.params.id } });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}));

// Update a student by id
router.put("/students/:id", tryCatchWrapper(async (req, res) => {
    try {
        // Check if the student exists
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            res.status(400).json({ message: "Student not found" });
        } else {
            // Update the student
            await student.update(req.body);
            res.send(student);
        }
    } catch (err) {
        next(err);
    }
}));

module.exports = router;
