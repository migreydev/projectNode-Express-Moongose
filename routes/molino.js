
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getMolinos, getMolino, addMolino, updateMolino, deleteMolino } = require('../controllers/molino');

// Obtener todos los molinos
router.get('/', getMolinos);

// Obtener un molino por ID
router.get('/:id', [
  check('id', 'No es un ID correcto').isMongoId(),
  validateFields
], getMolino);

// Agregar un nuevo molino
router.post('/', [
  check('nombre', 'Nombre es requerido').not().isEmpty(),
  check('tipo', 'Tipo es requerido').not().isEmpty(),
  validateFields
], addMolino);

// Actualizar un molino por ID
router.put('/:id', [
  check('id', 'No es un ID correcto').isMongoId(),
  check('nombre', 'Nombre es requerido').not().isEmpty(),
  check('tipo', 'Tipo es requerido').not().isEmpty(),
  validateFields
], updateMolino);

// Eliminar un molino por ID
router.delete('/:id', [
  check('id', 'No es un ID correcto').isMongoId(),
  validateFields
], deleteMolino);

module.exports = router;
