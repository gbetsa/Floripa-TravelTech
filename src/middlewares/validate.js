const validate = (schema) => async (req, res, next) => {
    try {
        // Valida os dados da requisição contra o esquema Zod fornecido
        const validatedData = await schema.parseAsync(req.body);

        // Substitui o corpo da requisição pelos dados validados (filtrando campos extras)
        req.body = validatedData;

        next();
    } catch (error) {
        // Mapeia erros de validação para um formato amigável
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