const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length >= 1;
}

const InvoiceModelSchema = new mongoose.Schema({

    deal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DEAL"
    },
    designer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "DESGINER"
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CLIENT"
    },
    tags:{
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} deve avere almeno 1 elemento']
    },
    amount:{
        amount_value:{
            type: Number,
            required: true
        },
        amount_unit:{
            type: String,
            required: true
        }
    },
    clientName:{
        type: String,
        required: true
    },
    clientSurname:{
        type: String,
        required: true
    },
    clientVatOrCf:{
        type: String,
        required: true
    },
    clientCompany:{
        type: String,
        required: true
    },
    clientAddress:{
        type: String,
        required: true
    },
    designerName:{
        type: String,
        required: true
    },
    designerSurname:{
        type: String,
        required: true
    },
    designerVatOrCf:{
        type: String,
        required: true
    },
    designerAddress:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model("INVOICE", InvoiceModelSchema, "invoices");