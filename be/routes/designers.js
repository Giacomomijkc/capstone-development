const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const DesignersModel = require('../models/DesignerModel');

const designer = express.Router();

//designer creation
designer.post('/designers/create', async (req, res) =>{

    const { nickname } = req.body;
    const {email} = req.body;

    try {

        const existingDesigner = await DesignersModel.findOne({ nickname });

        if (existingDesigner) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Nickname already exists. Please choose a different nickname.',
            });
        }

        const existingEmail = await DesignersModel.findOne({email});

        if (existingEmail) {
            return res.status(400).json({
                statusCode: 400,
                message:`${email} already exists in database, try to login o use another email`
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newDesigner = new DesignersModel({
            name: req.body.name,
            surname: req.body.surname,
            nickname: req.body.nickname,
            description: req.body.description,
            tags: req.body.tags,
            website: req.body.website,
            instagram: req.body.instagram,
            avatar: req.body.avatar,
            address: req.body.address,
            vatOrCf: req.body.vatOrCf,
            email: req.body.email,
            password: hashedPassword,
        })

        const designer = await newDesigner.save();

        res.status(201).send({
            statusCode: 201,
            message: 'Account as designer successfully created',
            payload: designer
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

module.exports = designer;