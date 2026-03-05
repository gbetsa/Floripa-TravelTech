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

/**
 * @swagger
 * tags:
 *   name: Startups
 *   description: API para gestão de startups do ecossistema de turismo
 */

/**
 * @swagger
 * /api/startup:
 *   post:
 *     summary: Cria uma nova startup
 *     tags: [Startups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Startup'
 *           example:
 *             nome: 'Nova Startup'
 *             descricao: 'Uma startup inovadora.'
 *             cnpj: '00000000000100'
 *             fundador: 'Empresário X'
 *             email: 'contato@nova.com'
 *             municipio: 'Florianópolis'
 *             segmento_turismo: 'Hospedagem'
 *             modelo_negocio: 'B2B'
 *             estagio: 'Ideação'
 *             ano_fundacao: 2024
 *             status: 'Ativo'
 *     responses:
 *       201:
 *         description: Startup criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Startup'
 *       400:
 *         description: Erro de validação
 */
/**
 * @swagger
 * /api/startup:
 *   get:
 *     summary: Lista todas as startups
 *     tags: [Startups]
 *     responses:
 *       200:
 *         description: Lista de todas as startups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
*/
/**
 * @swagger
 * /api/startup/{id}:
 *   get:
 *     summary: Retorna uma startup pelo ID
 *     tags: [Startups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: bd7d56e1-f633-49cb-a083-10c426b6050b
 *         description: ID da startup
 *     responses:
 *       200:
 *         description: Dados da startup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Startup'
 *       404:
 *         description: Startup não encontrada
 */
/**
 * @swagger
 * /api/startup/{id}:
 *   put:
 *     summary: Atualiza uma startup pelo ID
 *     tags: [Startups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: bd7d56e1-f633-49cb-a083-10c426b6050b
 *         description: ID da startup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Startup'
 *           example:
 *             nome: 'Startup Atualizada'
 *             descricao: 'Descrição atualizada.'
 *             estagio: 'Escala'
 *     responses:
 *       200:
 *         description: Startup atualizada com sucesso
 *       404:
 *         description: Startup não encontrada
 */
/**
 * @swagger
 * /api/startup/{id}:
 *   delete:
 *     summary: Exclui uma startup pelo ID
 *     tags: [Startups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: bd7d56e1-f633-49cb-a083-10c426b6050b
 *         description: ID da startup
 *     responses:
 *       204:
 *         description: Startup excluída com sucesso
 *       404:
 *         description: Startup não encontrada
 */
/**
 * @swagger
 * /api/startup/stats:
 *   get:
 *     summary: Retorna estatísticas das startups
 *     tags: [Startups]
 *     responses:
 *       200:
 *         description: Estatísticas calculadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
/**
 * @swagger
 * /api/startup/search?nome=Nova:
 *   get:
 *     summary: Busca startups por nome
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *           example: 'Nova'
 *         description: Nome da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */
/**
 * @swagger
 * /api/startup?estagio=Ideação:
 *   get:
 *     summary: Busca startups por estagio 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: estagio
 *         schema:
 *           type: string
 *           example: 'Ideação'
 *         description: Estagio da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
*/
/**
 * @swagger
 * /api/startup?status=Ativo:
 *   get:
 *     summary: Busca startups por status 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: 'Ativo'
 *         description: Status da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */
/**
 * @swagger
 * /api/startup?ano_fundacao=2024:
 *   get:
 *     summary: Busca startups por ano de fundação 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: ano_fundacao
 *         schema:
 *           type: string
 *           example: '2024'
 *         description: Ano de fundação da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */
/**
 * @swagger
 * /api/startup?segmento_turismo=Ideação:
 *   get:
 *     summary: Busca startups por segmento de turismo 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: segmento_turismo
 *         schema:
 *           type: string
 *           example: 'Hospedagem'
 *         description: Segmento de turismo da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */
/**
 * @swagger
 * /api/startup?modelo_negocio=B2B:
 *   get:
 *     summary: Busca startups por modelo de negócio 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: modelo_negocio
 *         schema:
 *           type: string
 *           example: 'B2B'
 *         description: Modelo de negócio da startup para busca
 *     responses:
 *       200:
 *         description: Lista de startups encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */
/**
 * @swagger
 * /api/startup?page=1&limit=10:
 *   get:
 *     summary: Lista todas as startups com paginação 
 *     tags: [Startups]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: '1'
 *         description: Página da lista de startups
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           example: '10'
 *         description: Limite de startups por página
 *     responses:
 *       200:
 *         description: Lista de startups encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 */

module.exports = router;