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

    var charsToPurge = /[^\w\s,\.?!=']/igm;

    var replaceInvalidCharacters = function (stringa) {
        return ((""+stringa+"").replace(dictionary_RegEx, function (match) {
            return dictionary[match];
        }));
    };

    var parseBody = function (req, res, next) {
        var requestBody = req.body;
        for (var key in requestBody) {
		if(key=="photo")
			continue;
            requestBody[key] = replaceInvalidCharacters(requestBody[key]);
            requestBody[key] = requestBody[key].replace(charsToPurge, "");
        }
        next();
    };

    exports.replace = parseBody;
})();
