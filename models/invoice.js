const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    daysWorked: {
        type: Number,
        required: true,
    },
    tjm: {
        type: Number,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema);
