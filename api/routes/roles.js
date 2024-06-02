const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { verifyToken, verifyAdmin } = require('../utils/verifyToken');

// Create a new role
router.post('/create', verifyAdmin, async (req, res) => {
    const tempRole = await Role.findOne({role: req.body.role});
    // Check if role already exists
    if(tempRole) {
        return res.status(400).send("Role already exists");
    }
    try {
        // Check if role is provided
        if(req.body.role && req.body.role !== "") {
            const role = new Role({
                role: req.body.role
            });
            await role.save();
            res.status(200).send("Role created successfully");
        } else {
            res.status(400).send("Role is required");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Update a role
router.put('/update/:id', verifyAdmin, async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        // Check if role exists
        if(role) {
             // Check if role is provided
            if(req.body.role && req.body.role !== "") {
                role.role = req.body.role;
                await role.save();
                res.status(200).send("Role updated successfully");
            } else {
                res.status(400).send("Role is required");
            }
        } else {
            res.status(404).send("Role not found");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Get all roles
router.get('/get', verifyAdmin, async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).send(roles);
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Get a role by id
router.get('/get/:id', verifyToken, async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        // Check if role exists
        if(role) {
            res.status(200).send(role);
        } else {
            res.status(404).send("Role not found");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Delete a role
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        // Check if role exists
        if(role) {
            await Role.findByIdAndDelete(req.params.id);
            res.status(200).send("Role deleted successfully");
        } else {
            res.status(404).send("Role not found");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;