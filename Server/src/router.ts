import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  updateAvailibility,
  deleteProduct,
} from "./handlers/products.actions";
import { handleInputErrors } from "./middleware";

const router = Router()
/**
* @swagger
* components: 
*     schemas:
*       Product:
*         type: object
*         properties: 
*           id:
*             type: integer
*             description: The product ID
*             example: 1
*           name:
*             type: string
*             description: The product name
*             example: XIAOMI MI 13 PRO
*           price:
*             type: number
*             description: The product price
*             example: 300
*           availability:
*             type: boolean
*             description: The product status
*             example: true
* 
*/

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Ge a list of products
 *      tags: 
 *        - Products  
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Product'
 *                       
 */

//GET ALL PRODUCTS
router.get("/products/", getProducts);



/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by her ID
 *      tags: 
 *        - Products  
 *      description: Return a product by her ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *              
 *          400:
 *              description: Bad requese, invalid ID       
 */

//GET ONE PRODUCT BY THE ID
router.get(
  "/products/:id",
  param("id", "Id no valido").isNumeric(),
  handleInputErrors,
  getProductsById
);

/**
 * @swagger
 * /api/products/:
 *    post:
 *      summary: Create a new product
 *      tags: 
 *        - Products  
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Iphone 15 pro max"
 *                          price:
 *                              type: number
 *                              example: 1500
 *      responses:
 *          201:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid register, something is bad      
 */

//CREATE NEW PRODUCT
router.post(
  "/products/",
  body("name", "Nombre no valido")
    .notEmpty()
    .isString()
    .withMessage("Nombre del producto no valido"),
  body("price", "Necesitas un precio para este producto")
    .notEmpty()
    .custom((value) => value > 0)
    .withMessage("Precio debe ser mayor a 0")
    .isNumeric()
    .withMessage("Precio del producto no valido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Update a register with new input data
 *      tags: 
 *        - Products  
 *      description: Return the update product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Iphone 15 pro max"
 *                          price:
 *                              type: number
 *                              example: 1500
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request 
 *          404:
 *              description: Product not found      
 */
//ALTER ALL THE DATE INTO A REGISTER
router.put(
  "/products/:id",
  param("id").isInt().withMessage("ID non-valid"),
  body("name").notEmpty().withMessage("Name of product cant be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price not valid")
    .notEmpty()
    .withMessage("Price of product cant be empty")
    .custom((value) => value > 0)
    .withMessage("Price must be higher or different to cero"),
  body("availability")
    .isBoolean()
    .withMessage("Availibility of product cant be empty"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Update product availability
 *      tags: 
 *        - Products  
 *      description: Return the update availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request    
 *          404:
 *              description: Product not found      
 */
//ALTER ONLY ONE ATRIBBUTE FROM A REGISTER - ITS MORE SAVE
router.patch(
  "/products/:id",
  param("id", "Id no valido").isNumeric(),
  handleInputErrors,
  updateAvailibility
);

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Delete a product
 *      tags: 
 *        - Products  
 *      description: Return a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful register
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Products deleted correct"    
 *          400:
 *              description: Bad request    
 *          404:
 *              description: Product not found      
 */
//ALTER ONLY ONE ATRIBBUTE FROM A REGISTER - ITS MORE SAVE
//DROP A PRODUCT FROM THE database
router.delete(
  "/products/:id",
  param("id", "Id no valido").isNumeric(),
  handleInputErrors,
  deleteProduct
);

export default router;
