const mongoose = require('mongoose');
const express = require('express');

const ProjectsModel = require('../models/ProjectModel');
const DesignersModel = require('../models/DesignerModel');

const project = express.Router();

//project creation
project.post('/projects/create', async (req, res) =>{

    try {

        const { title, description, cover, images, author, tags } = req.body;

        const designer = await DesignersModel.findById(author);
        if (!designer) {
            return res.status(404).json({ message: "Designer not found" });
        }

        const newProject = new ProjectsModel({
            title,
            description,
            cover,
            images,
            author,
            tags
        });

        designer.projects.push(newProject._id);
        await designer.save();
        
        const createdProject = await newProject.save();

        res.status(201).json({
            message: "Project created successfully",
            project: createdProject
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

module.exports = project;