const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getMetodos, getMetodo, addMetodo, updateMetodo, deleteMetodo} = require("../controllers/metodo");

router.get('/',getMetodos)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validateFields
],getMetodo)

router.post('/', [
    check('filtro', 'filtro is required').not().isEmpty(),
    check('espresso', 'espresso is required').not().isEmpty(),
    validateFields
], addMetodo);

router.put('/:id',[
    check('filtro', 'filtro is required').not().isEmpty(),
    check('espresso', 'espresso is required').not().isEmpty(),
    validateFields
],updateMetodo)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validateFields
],deleteMetodo)

module.exports = router;