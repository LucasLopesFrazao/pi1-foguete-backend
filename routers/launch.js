const express = require('express');
const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get("/", async (req, res) => {
    const launchRef = db.collection('launch');
    const snapshot = await launchRef.get();
    const launches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(launches);
});

router.get(":id", async (req, res) => {
    const launchRef = db.collection('launch').doc(req.params.id);
    const doc = await launchRef.get();
    if (!doc.exists) {
        return res.status(404).send('Launch not found');
    }
    res.status(200).json(doc.data());
});

router.post("/", async (req, res) => {
    const { rocketId, ...launchData } = req.body;
    const launchRef = db.collection('launch').doc(`${uuidv4()}`);
    const response = await launchRef.set({ ...launchData, rocketId: rocketId });
    res.status(200).send(response);
});

router.put("/:id", async (req, res) => {
    const launchRef = db.collection('launch').doc(req.params.id);
    const result = await launchRef.update(req.body);
    res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
    const launchRef = db.collection('launch').doc(req.params.id);
    await launchRef.delete();
    res.status(200).send('Launch deleted');
});

module.exports = router;
