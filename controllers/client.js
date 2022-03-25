const Client = require('../models/client');
const User = require("../models/user");

exports.createClient = async (req, res, next) => {
    const clientName = req.body.clientName;
    const tjm = req.body.tjm;
    const userId = req.params.userId;
    const client = await new Client({clientName, tjm, userId});
    try {
        const user = await User.findById(userId);
        user.client = client._id;
        user.save();
        client.save();
        res.status(201).json({message: 'Client created', client});
    } catch (e) {
        console.log(e)
    }
}

exports.getClient = async (req, res, next) => {
    const userId = req.params.userId;
    const client = await Client.findOne({userId});
    console.log(client);
    try {
        res.status(200).json({message: 'Client available', client});
    } catch (e) {
        console.log(e)
    }
}
