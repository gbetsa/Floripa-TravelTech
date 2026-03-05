const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const startupSchema = require('../validations/startupSchema');
const startupController = require('../controllers/startupControllers');

router.get(
    '/stats',
    startupController.stats
);

router.get(
    '/search',
    startupController.search
);

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

router.put(
    '/:id',
    validate(startupSchema.partial()),
    startupController.update
);

router.delete(
    '/:id',
    startupController.remove
);

module.exports = router;