const Company = require("../models/company");
const User = require("../models/user");

exports.createCompany = async (req, res, next) => {
    const userId = req.params.userId;
    const companyInput = req.body.data;
    const company = await new Company({...companyInput, userId});
    try {
        const user = await User.findById(userId);
        user.company = company._id;
        user.save();
        company.save();
        res.status(201).json({message: 'Company created'});
    } catch (e) {
        console.log(e)
    }
}
