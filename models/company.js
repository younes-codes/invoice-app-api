const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    siret: {
        type: String,
        required: true,
    },
    bic: {
        type: String,
        required: true,
    },
    tva: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Company', invoiceSchema);
