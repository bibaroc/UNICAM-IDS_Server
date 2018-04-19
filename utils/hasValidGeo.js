(function () {
    "use strict";

    exports.isValidGeo = function (req, res, next) {
        if (!req.body) {
            return res.status(400).send({
                "success": false,
                "msg": "We are not able to understand you request, sorry we are trying very hard."
            });
        } else if (!req.body.lat || !req.body.long) {
            return res.status(400).send({
                "success": false,
                "msg": "We are sorry, but we realy need your geographical location. Turn on gps and retry."
            });
        } else if (parseFloat(req.body.lat) < -90 || parseFloat(req.body.lat) > 90) {
            return res.status(400).send({
                "success": false,
                "msg": req.body.lat + " is not a valid latitude."
            });
        } else if (parseFloat(req.body.long) < -180 || parseFloat(req.body.long) > 180) {
            return res.status(400).send({
                "success": false,
                "msg": req.body.long + " is not a valid latitude."
            });
        } else {
            next();
        }
    };

    exports.isValidAddress = function (req, res, next) {
        if (!req.body) {
            return res.status(400).send({
                "success": false,
                "msg": "We are not able to understand you request, sorry we are trying very hard."
            });
        } else if (!req.body.address || !req.body.phone) {
            return res.status(400).send({
                "success": false,
                "msg": "We are sorry, but we realy need your address and phone number."
            });
        } else if (!/([0-9]{10})$/.test(req.body.phone)) {
            return res.status(400).send({
                "success": false,
                "msg": req.body.phone + " is not a valid phone number."
            });
        } else {
            next();
        }
    };



})();