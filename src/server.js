const express = require("express");
const cors = require("cors");
const router = require("./routers/routers");
const connection = require("./database/connection");

const APP_PORT = process.env.APP_PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

class Server {
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        server.use(router);
        this.initializeServer(server);
    }

    middlewares(server) {
        console.log('Executando middlewares.');
        if (ALLOWED_ORIGINS) {
            const allowedOriginsArray = ALLOWED_ORIGINS.split(',');
            server.use(cors({
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true); // Requisições sem origem (ex: Postman)

                    if (allowedOriginsArray.indexOf(origin) !== -1) {
                        callback(null, true);
                    } else {
                        // Aqui rejeita a origem sem erro no callback
                        callback(null, false);
                    }
                }
            }));

            // Middleware de bloqueio explícito para origens não permitidas
            server.use((req, res, next) => {
                const origin = req.headers.origin;
                if (origin && !allowedOriginsArray.includes(origin)) {
                    return res.status(403).json({ error: 'CORS: Origem não permitida' });
                }
                next();
            });

            console.log('Middleware CORS executado com sucesso.');
        } else {
            server.use(cors());

        }
        server.use(express.json());
        console.log('Middlewares executado com sucesso.');
    }

    async database() {
        try {
            console.log('Iniciando conexão com o banco de dados.');
            await connection.authenticate();
            console.log('Conexão com o banco de dados iniciada com sucesso.');
        } catch (error) {
            console.log("Erro ao iniciar conexão com o banco de dados: " + error);
        }
    }

    initializeServer(server) {
        console.log('Iniciando servidor.');
        server.listen(APP_PORT, () => {
            console.log(`Servidor rodando na porta ${APP_PORT}`);
        });
        console.log('Servidor iniciado com sucesso.');
    }
}

module.exports = { Server };
