const validate = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync(req.body);

        req.body = validatedData;

        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: error.errors?.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
};

module.exports = validate;