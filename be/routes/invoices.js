const mongoose = require('mongoose');
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const ClientsModel = require('../models/ClientModel');
const DesignersModel = require('../models/DesignerModel');
const DealsModel = require('../models/DealModel');
const InvoicesModel = require('../models/InvoiceModel');

const invoice = express.Router();

//creazione invoice
invoice.post('/invoices/create', verifyToken, async (req, res) => {
    try {
        const { dealId, amount, description } = req.body;

        const deal = await DealsModel.findById(dealId).populate('designer client');

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.status !== 'completed') {
            return res.status(400).json({ message: 'Cannot create invoice for non-completed deals' });
        }

        const designerId = deal.designer._id.toString();
        const clientId = deal.client._id.toString();
        const creatorId = req.user._id.toString();

        if (creatorId !== designerId) {
            return res.status(403).json({ message: 'You can only create invoices for your completed deals' });
        }

        const invoiceData = {
            deal: deal._id,
            designer: designerId,
            client: clientId,
            tags: deal.tags,
            amount: {
                amount_value: amount.amount_value,
                amount_unit: amount.amount_unit
            },
            clientName: deal.client.name,
            clientSurname: deal.client.surname,
            clientVatOrCf: deal.client.vatOrCf,
            clientCompany: deal.client.company,
            clientAddress: deal.client.address,
            designerName: deal.designer.name,
            designerSurname: deal.designer.surname,
            designerVatOrCf: deal.designer.vatOrCf,
            designerAddress: deal.designer.address,
            description
        };

        const newInvoice = new InvoicesModel(invoiceData);
        await newInvoice.save();

        const designer = await DesignersModel.findById(designerId);
        const client = await ClientsModel.findById(clientId);

        designer.invoices.push(newInvoice._id);
        client.invoices.push(newInvoice._id);

        await designer.save();
        await client.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error', error });
    }
});

//patch per consentire al designer di modificare l'invoice
invoice.patch('/invoices/:invoiceId/update', verifyToken, async (req, res) => {
    try {
        const { invoiceId } = req.params;

        const invoice = await InvoicesModel.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const invoiceDesignerToString = invoice.designer.toString();
        const reqUserIdToString = req.user._id.toString();
        if (req.user.role !== 'Designer' || invoiceDesignerToString !== reqUserIdToString) {
            return res.status(403).json({ message: 'Only the designer who created the invoice can update it' });
        }

        const dataToUpdate = req.body;
        const options = { new: true };
        const result = await InvoicesModel.findByIdAndUpdate(invoiceId, dataToUpdate, options);

        res.status(200).json({
            statusCode: 200,
            message: `Invoice with id ${invoiceId} updated successfully`,
            result
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});



module.exports = invoice;