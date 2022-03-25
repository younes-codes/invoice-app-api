const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await new User({email, password: hashedPw});
    try {
        user.save();
        res.status(201).json({message: 'User created', userId: user._id});
    } catch (e) {
        console.log(e)
    }
}

