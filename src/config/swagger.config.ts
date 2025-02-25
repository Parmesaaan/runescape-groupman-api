import {VERSION} from "./environment.config";
import 'dotenv/config'

export const swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CGIM Backend',
            version: VERSION || '0',
            description: 'CGIM Backend',
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVER_PORT || 3000}`,
                description: 'Local testing'
            },
            {
                url: process.env.STG_A_HOST,
                description: 'Staging A testing',
            },
            {
                url: process.env.STG_B_HOST,
                description: 'Staging B testing',
            },
        ]
    },
    apis: [
        './src/routes/**/*.routes.ts',
        './src/controllers/**/*.dto.ts',
        './src/controllers/**/**/*.dto.ts',
        './src/controllers/**/**/**/*.dto.ts',
        './src/routes/**/*.routes.js',
        './src/controllers/**/*.dto.js',
        './src/controllers/**/**/*.dto.js',
        './src/controllers/**/**/**/*.dto.js'
    ]
}