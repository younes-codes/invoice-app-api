const express = require('express');
const router = express.Router();
const companyController = require("../controllers/company");

router.post('/create-company/:userId', companyController.createCompany);

module.exports = router;
