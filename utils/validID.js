(function () {
    "use strict";

    exports.isValidID = function (req, res, next) {
        if (!req.params || !req.params.id) {
            return res.status(400).send({
                "success": false,
                "msg": "We are not able to understand you request, sorry we are trying very hard."
            });
        } else if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
            return res.status(400).send({
                "success": false,
                "msg": "Unfortunately " + req.params.id + " is not a valid ID."
            });
        } else {
            next();
        }
    };
})();