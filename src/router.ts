import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product of retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 * 
 */         
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 499
 *                          availability:
 *                              type: boolean
 *                              example: false
 *      responses:
 *          201:
 *              description: Product updated successfully
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 */
router.post('/', 
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('price', 'El precio debe ser un número')
    .isFloat()
    .custom( value => value > 0 ).withMessage('Precio no válido'),
    body('availability', 'La disponibilidad debe ser un valor booleano').isBoolean(),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Updates a product by ID
 *      tags:
 *          - Products
 *      description: Return the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product of retrieve
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 499
 *                          availability:
 *                              type: boolean
 *                              example: false
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 *          404:
 *              description: Not found
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('price', 'El precio debe ser un número')
    .isFloat()
    .custom( value => value > 0 ).withMessage('Precio no válido'),
    body('availability', 'La disponibilidad debe ser un valor booleano').isBoolean(),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by ID
 *    tags:
 *       - Products
 *    description: Deletes a product by its unique ID
 *    parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product of retrieve
 *            required: true
 *            schema:
 *              type: integer
 *    responses:
 *       200:
 *          description: Product deleted successfully
 *       404:
 *          description: Not found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)
export default router;