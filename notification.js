const express = require('express');
const router = express.Router();
const fcm = require('fcm-notification');
const serviceAccount = require('./serviceAccountKey.json');
const FCM = new fcm(serviceAccount);

router.post('/send-single-notification', (req, res) => {
    const {title, body, token} = req.body;
    const message = {
        notification: {
            title,
            body,
        },
        token,
    };

    FCM.send(message, (err, response) => {
        if (err){
            res.json({message: "Notification could not be sent."}).status(400);
        } else {
            res.json({message: "Notification was successfully sent.", response}).status(200);
        }
    })
});

router.post('/send-multiple-notification', (req, res) => {
    const {title, body, tokens} = req.body;
    const message = {
        notification: {
            title,
            body,
        },
    };

    FCM.sendToMultipleToken(message, tokens, (err, response) => {
        if (err){
            res.json({message: "Notification could not be sent."}).status(400);
        } else {
            res.json({message: "Notification was successfully sent.", response}).status(200);
        }
    })
});

module.exports = router;
