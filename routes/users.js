var express = require('express');
var router = express.Router();

// Importamos modelo Tarea
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { verificarAuth, verificaRol } = require('../middlewares/autenticacion.js');

// Filtrar campos de PUT
const _ = require('underscore');

router.post('/nuevo-usuario', [verificarAuth, verificaRol], async (req, res) => {

    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        pass: req.body.pass,
        role: req.body.role
    }

    try {
        // Generar el salt y el hash de la contraseña
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(body.pass, salt);
        body.pass = hashedPassword;

        const userDB = await User.create(body);

        return res.json(userDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }

});

/* GET users listing. */
router.get('/usuario', verificarAuth, async (req, res) => {
    const usuarioId = req.usuario._id;
    console.log(usuarioId);
    try {
        const usuario = await User.findById(usuarioId, '-password'); // Excluye el campo de la contraseña
        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        res.status(200).json({ user: usuario });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Ocurrió un error',
            error
        });
    }
});

router.put('/usuario/:id', [verificarAuth, verificaRol], async (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'pass']);
    if (body.pass) {
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    try {
        // {new:true} nos devuelve el usuario actualizado
        const usuarioDB = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        return res.json(usuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }

});

router.delete('/usuario/:id', [verificarAuth, verificaRol], async (req, res) => {
    console.log("id");
    let id = req.params.id;

    try {

        const usuarioDelete = await User.findByIdAndRemove(id);
        console.log(usuarioDelete);
        if (!usuarioDelete) {
            return res.status(400).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        return res.json(usuarioDelete);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }

});

module.exports = router;