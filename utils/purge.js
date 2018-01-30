//   /(^[a-zA-Z0-9.,!?]*)$/.test('.,.!!??,.');
//  "hbfsjbfhsdj%$$fhmvsbdfjhvb".replace(new RegExp("([^a-zA-Z0-9.,!?]+)", 'g'), "");   questa funzione diocane
//   


(function () {
    "use strict";
    var dictionary_RegEx = /[äàöòèéüìÄÀÖÒÈÉÜÌ]/g;
    var dictionary = {
        "ä": "a", "ö": "o", "è": "e'", "ü": "u",
        "Ä": "A", "Ö": "O", "È": "E'", "Ü": "U",
        "à": "a'", "ò": "o'", "é": "e'", "ì": "i'",
        "À": "A'", "Ò": "O'", "É": "E'", "Ì": "I'"
        // probably more to come
    };

    var charsToPurge = /[^\w\s,.?!']/gi;

    var replaceInvalidCharacters = function (string) {
        return (string.replace(dictionary_RegEx, function (match) {
            return dictionary[match];
        }));
    };

    var parseBody = function (req, res, next) {
        console.log("prima : "+JSON.stringify(req.body));
        var requestBody = req.body;
        for (var key in requestBody) {
            requestBody[key] = replaceInvalidCharacters(requestBody[key]);
            requestBody[key] = requestBody[key].replace(charsToPurge, "");
        }
        console.log("dopo : "+JSON.stringify(req.body));
        next();
    };

    exports.replace = parseBody;
})();