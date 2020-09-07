const express = require("express");
const router = express.Router();
const Actividades = require("../models/Actividades");
const verify = require("../verification/verify")
const jwt = require('jsonwebtoken')

router.post('/actividad', verify, async(req, res) =>{
    console.log(req.body)
    const decoded = jwt.decode(req.headers.token)
    const actividad = new Actividades({
        usuario_id_usuario: null,
        nombre_proyecto: req.body.nombre_proyecto,
        descripcion_proyecto: req.body.descripcion_proyecto,
        trabajo: req.body.trabajo,
        zona: req.body.zona,
        cant_trabajadores: req.body.cant_trabajadores,
        estado_proyecto: null,
        usuario_id_usuario : decoded,
        Id_unidos: null
    })

    try{
        await actividad.save()
        res.json({
            succes: 1
        })
    }catch(err){
        res.send(err)
    }
})

router.get('/actividad', async(req, res) =>{
    try{
        const activ = await Actividades.find()
        res.json({
            succes: 1,
            data: activ
        })
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router