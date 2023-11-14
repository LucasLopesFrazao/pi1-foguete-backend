const express = require('express');
const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get("/", async (req, res) => {
    const rocketRef = db.collection('rocket');
    const snapshot = await rocketRef.get();
    const rockets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(rockets);
});

router.get("/:id", async (req, res) => {
    const rocketRef = db.collection('rocket').doc(req.params.id);
    const doc = await rocketRef.get();
    if (!doc.exists) {
        return res.status(404).send('Rocket not found');
    }
    res.status(200).json(doc.data());
});

router.post("/", async (req, res) => {
    const { sensorIds, ...rocketData } = req.body;
    const rocketRef = db.collection('rocket').doc(`${uuidv4()}`);
    const response = await rocketRef.set({ ...rocketData, sensors: sensorIds });
    res.status(200).send(response);
});

router.put("/:id", async (req, res) => {
    const rocketRef = db.collection('rocket').doc(req.params.id);
    const result = await rocketRef.update(req.body);
    res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
    const rocketRef = db.collection('rocket').doc(req.params.id);
    await rocketRef.delete();
    res.status(200).send('Rocket deleted');
});

module.exports = router;
