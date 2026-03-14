const { z } = require('zod');

// Validação do schema de startups
const startupSchema = z.object({
    nome: z
        .string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres'),

    descricao: z
        .string()
        .min(5, 'Descrição deve ter pelo menos 5 caracteres')
        .max(500, 'Descrição deve ter no máximo 500 caracteres'),

    cnpj: z
        .string()
        .length(14, 'CNPJ inválido'),

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

    segmento_turismo: z
        .enum([
            'Hospedagem',
            'Transporte',
            'Experiencias',
            'Marketplace',
            'Tecnologia_Hotelaria',
            'Tecnologia_Agencias',
            'Eventos',
            'Turismo_Sustentavel',
            'Outro'
        ]),

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