const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');

const ClientsModel = require('../models/ClientModel');

const client = express.Router();

//client creation
client.post('/clients/create', async (req, res) =>{

    const { email } = req.body;

    try {

        const existingEmail = await ClientsModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                statusCode: 400,
                message: `${email} already exists in database, try to login o use another email`,
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newClient = new ClientsModel({
            name: req.body.name,
            surname: req.body.surname,
            company: req.body.company,
            description: req.body.description,
            website: req.body.website,
            avatar: req.body.avatar,
            address: req.body.address,
            vatOrCf: req.body.vatOrCf,
            email: req.body.email,
            password: hashedPassword,
        })

        const client = await newClient.save();

        res.status(201).send({
            statusCode: 201,
            message: 'Account as Client successfully created',
            payload: client
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

module.exports = client;