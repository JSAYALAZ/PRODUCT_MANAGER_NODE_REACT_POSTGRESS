import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";
import { version } from "typescript";


const options : swaggerJSDoc.Operation={
    swaggerDefinition:{
        openapi: '3.0.0',
        tags:
        [
            {
                name: 'Products',
                description: 'API operations related to products',
            }
        ],
        info:{
            title: 'PRODUCTION REST API Node.js / Express / Typescript',
            version: "2.0.0",
            description: "Api Docs for products administration"
        }
    },
    apis:[
        './src/router.ts'
    ]
}

const swaggerSpec =swaggerJSDoc(options)

const swaggerUIOptions: SwaggerOptions = {
    customSiteTitle: 'REST API',
    customCss: `
        .topbar-wrapper .link {
            content: url('localhost:4000//src/img/MiLogo.svg');
            height: 120px;
            width: auto;
        }
    `,

};
export default swaggerSpec
export { swaggerUIOptions}