const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length >= 1;
  }

const SpecificQuoteRequestModelSchema = new mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CLIENT"
    },
    designer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Designer"
    },
    tags:{
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} deve avere almeno 1 elemento']
    },
    budget:{
        budget_value:{
            type: Number,
            required: true
        },
        budget_unit:{
            type: String,
            required: true
        }
    },
    description:{
        type: String,
        required: true
    },
    deadline:{
        type: String,
        required: false
    },
}, { timestamps: true, strict: true });

module.exports = mongoose.model("SPECIFICQUOTEREQUEST", SpecificQuoteRequestModelSchema, "specificlquoterequests");