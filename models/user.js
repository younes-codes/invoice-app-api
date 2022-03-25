const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    invoices: {
        type: [Schema.Types.ObjectId],
        ref: 'Invoice',
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },

})

module.exports = mongoose.model('User', userSchema);
