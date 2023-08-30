const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/verifyToken');

const CommentsModel = require('../models/CommentModel');
const ProjectsModel = require('../models/ProjectModel');
const ClientsModel = require('../models/ClientModel');
const DesignersModel = require('../models/DesignerModel');

const comment = express.Router();

//comment creation
comment.post('/comments/create', verifyToken, async (req, res) =>{

    const { text, rate, project_id } = req.body;

    try {

        const author_id = req.user._id;
        const author_role = req.user.role;

        let authorModel;
        if (author_role === 'Designer') {
            authorModel = DesignersModel;
        } else if (author_role === 'Client') {
            authorModel = ClientsModel;
        } else {
            return res.status(400).json({ message: 'Invalid author role' });
        }

        const existingAuthor = await authorModel.findById(author_id);
        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const existingProject = await ProjectsModel.findById(project_id);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newComment = new CommentsModel({
            author: author_id,
            authorType: author_role,
            project: project_id,
            text,
            rate
        });

        existingProject.comments.push(newComment._id);
        await existingProject.save();

        const createdComment = await newComment.save();

        res.status(201).json({
            message: 'Comment created successfully',
            comment: createdComment
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }    
})

module.exports = comment;