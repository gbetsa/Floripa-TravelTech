const { z } = require('zod');

const startupSchema = z.object({
    nome: z
        .string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres'),

    cnpj: z
        .string()
        .min(14, 'CNPJ inválido')
        .max(14, 'CNPJ inválido'),

    fundador: z
        .string()
        .min(3, 'Nome do fundador deve ter pelo menos 3 caracteres'),

    email: z
        .string()
        .email('E-mail inválido'),

    municipio: z
        .string()
        .refine((value) => value === 'Florianópolis', {
            message: 'Apenas startups de Florianópolis são permitidas'
        }),

    modelo_negocio: z
        .string()
        .min(3, 'Modelo de negócio obrigatório'),

    estagio: z.enum(['Ideação', 'MVP', 'Tração', 'Escala']),

    ano_fundacao: z
        .number()
        .int()
        .min(2000, 'Ano inválido')
        .max(new Date().getFullYear(), 'Ano não pode ser no futuro'),

    status: z.enum(['Ativo', 'Inativo']).optional()
});

module.exports = startupSchema;