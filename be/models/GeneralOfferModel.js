const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length >= 1;
  }

const GeneralOfferModelSchema = new mongoose.Schema({
    general_quote_request:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GENERALQUOTEREQUEST"
    },
    designer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Designer"
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
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
    description:{
        type: String,
        required: true
    },
    rework_limit:{
        type: Number,
        required: true
    },
    timing:{
        timing_value:{
            type: Number,
            required: true
        },
        timing_unit:{
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        default: 'offered', // Stato predefinito
        required: true
      }
}, { timestamps: true, strict: true });

module.exports = mongoose.model("GENERALOFFER", GeneralOfferModelSchema, "generaloffers");
