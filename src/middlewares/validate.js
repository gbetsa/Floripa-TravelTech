const validate = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync(req.body);

        req.body = validatedData;

        next();
    } catch (error) {
        const issues = error.issues || error.errors || [];

        return res.status(400).json({
            message: 'Erro de validação',
            errors: issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
};

module.exports = validate;