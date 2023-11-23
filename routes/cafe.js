const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getCoffees, getCoffee, addCoffee, updateCoffee, deleteCoffee} = require("../controllers/cafe");

router.get('/',getCoffees)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validateFields
],getCoffee)

router.post('/', [
    check('nombre', 'Name is required').not().isEmpty(),
    check('origen', 'origen is required').not().isEmpty(),
    check('tipo', 'tipo is required').not().isEmpty(),
    check('precio', 'precio is required').not().isEmpty(),
    validateFields
], addCoffee);

router.put('/:id',[
    check('nombre','Name is required').not().isEmpty(),
    check('origen','origen is required').not().isEmpty(),
    check('tipo','tipo is required').not().isEmpty(),
    check('precio','precio is required').not().isEmpty(),
    validateFields
],updateCoffee)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validateFields
],deleteCoffee)

module.exports = router;