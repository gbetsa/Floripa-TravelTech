const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const startupSchema = require('../validations/startupSchema');
const startupController = require('../controllers/startupControllers');

router.post(
    '/',
    validate(startupSchema),
    startupController.create
);

router.get(
    '/',
    startupController.findAll
);

router.get(
    '/:id',
    startupController.findOne
);

module.exports = router;