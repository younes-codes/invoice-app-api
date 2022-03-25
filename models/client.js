const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    tjm: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

})

module.exports = mongoose.model('Client', clientSchema);
