let fs = require("fs");

exports.writeFileToDisk = function (fileName, base_64_buffer) {


    fs.writeFile(__dirname +"/../public/server_img/" + fileName,
        Buffer.from(base_64_buffer, "base64"),
        (err) => { if (err) throw err; console.log("The file was ok"); });
};
