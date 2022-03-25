const express = require('express');
const router = express.Router();
const clientController = require("../controllers/client");

router.post('/create-client/:userId', clientController.createClient);
router.get('/get-client/:userId', clientController.getClient);

module.exports = router;
