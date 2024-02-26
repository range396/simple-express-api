import { Router } from 'express';
import { locationServiceAll, locationServiceCreate, locationServiceSpecific,
   locationServiceUpdateById, updateBatchLocationsByCategoryName,
   removeLocationById } from "../service/location-service.js";
import paginate from 'express-paginate';
import { body, query, param, validationResult, check } from 'express-validator';
import { isHeadersValid } from '../service/user-service.js';


export const router = Router();

//TODO: uncompleted swagger content for endpoints
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: The locations managing API
 * /api/locations:
 *   get:
 *     summary: Lists all the locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: The list of the locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'http://localhost:1234/json-doc#/Location'
 */

// Middleware
router.use( async (req, res, next) => {
   // TODO: uncompleted logic of token checking
   if(req.method == 'PATCH' || req.method == 'DELETE') {
      if (!isHeadersValid(req.headers)) {
         res.end(JSON.stringify({ error: 'invalid token!' })).status(400);
      }
   }
   next();
});

// Routes

// Retrieve all location with paginate by page_size, page, and category parameters
router.get('/', paginate.middleware(10, 10), async (req, res) => {
   await locationServiceAll(req, res);
});

// Create new location
router.post('/', async (req, res) => {
   await locationServiceCreate(req, res);
});

// Retrieve specific location by it's id
router.get('/:location_id', async (req, res) => {
   await locationServiceSpecific(req, res);
});

// Updating by id
router.patch('/:location_id',
    body('name', 'An error occurred with the field `name`, it must be min 4 characters and the string type.')
        .isString().isLength({ min: 4}),
    body('category', 'Category field should be string type and min 4 characters')
        .isString().isLength({min: 4}),
    async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.json({
         success: false,
         message: 'Arose some error',
         ...errors
      }).status(501);
   }
   await locationServiceUpdateById(req, res);
});

// Update records by category name
router.patch('/',
    body('name', 'An error occurred with the field `name`, it must be min 4 characters and the string type.')
        .isString().isLength({ min: 4}),
    async (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.json({
         success: false,
         message: 'Arose some error',
         ...errors
      }).status(501);
   }
   await updateBatchLocationsByCategoryName(req, res);
});

// Delete Record by id
router.delete('/:location_id', async (req, res) => {
   await removeLocationById(req, res);
});
