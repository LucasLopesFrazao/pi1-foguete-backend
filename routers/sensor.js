const express = require('express');
const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Endpoint para buscar todos os sensores
router.get("/", async (req, res) => {
    const sensorRef = db.collection('sensor');
    const snapshot = await sensorRef.get();
    const sensors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(sensors);
});

// Endpoint para buscar um sensor específico pelo ID
router.get("/:id", async (req, res) => {
    const sensorRef = db.collection('sensor').doc(req.params.id);
    const doc = await sensorRef.get();
    if (!doc.exists) {
        return res.status(404).send('Sensor not found');
    }
    res.status(200).json(doc.data());
});

// Endpoint para criar um novo sensor
router.post("/", async (req, res) => {
    const sensorRef = db.collection('sensor')
    const newSensorRef = sensorRef.doc(`${uuidv4()}`)
    const response = await newSensorRef.set(req.body);
    res.status(200).send(response);
});

// Endpoint para atualizar um sensor existente
router.put("/:id", async (req, res) => {
    const sensorRef = db.collection('sensor').doc(req.params.id);
    const result = await sensorRef.update(req.body);
    res.status(200).send(result);
});

// Endpoint para deletar um sensor
router.delete("/:id", async (req, res) => {
    const sensorRef = db.collection('sensor').doc(req.params.id);
    await sensorRef.delete();
    res.status(200).send('Sensor deleted');
});

module.exports = router;