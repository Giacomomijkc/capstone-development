const mongoose = require('mongoose');
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const ProjectsModel = require('../models/ProjectModel');
const DesignersModel = require('../models/DesignerModel');
const ClientsModel = require('../models/ClientModel');

const project = express.Router();

//project creation
project.post('/projects/create', verifyToken, async (req, res) =>{

    try {

        const { title, description, cover, images, tags } = req.body;

        if (req.user.role !== 'Designer') {
            return res.status(403).json({ message: 'Only designers accounts can create projects' });
        }

        const { _id } = req.user;

        const designer = await DesignersModel.findById(_id);
        if (!designer) {
            return res.status(404).json({ message: "Designer not found" });
        }

        const newProject = new ProjectsModel({
            author: _id,
            title,
            description,
            cover,
            images,
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


// Aggiunta e rimozione di like da un progetto
project.post('/projects/:projectId/like', verifyToken, async (req, res) => {
    try {
        const projectId = req.params.projectId;

        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const project = await ProjectsModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { _id, role } = req.user;

        const hasLiked = project.likes.some(like => like.author_id.equals(_id));

        if (hasLiked) {
            project.likes = project.likes.filter(like => !like.author_id.equals(_id));
        } else {
            project.likes.push({
                author_id: _id,
                author_role: role
            });
        }

        await project.save();

        if (role === 'Client') {
            const client = await ClientsModel.findById(_id);
            if (client) {
                if (hasLiked) {
                    client.liked_projects = client.liked_projects.filter(like => !like.project_id.equals(projectId));
                } else {
                    client.liked_projects.push({
                        project_id: projectId,
                        user_role: role
                    });
                }
                await client.save();
            }
        } else if (role === 'Designer') {
            const designer = await DesignersModel.findById(_id);
            if (designer) {
                if (hasLiked) {
                    designer.liked_projects = designer.liked_projects.filter(like => !like.project_id.equals(projectId));
                } else {
                    designer.liked_projects.push({
                        project_id: projectId,
                        user_role: role
                    });
                }
                await designer.save();
            }
        }

        res.status(200).json({ message: 'Like updated successfully' });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
});


module.exports = project;