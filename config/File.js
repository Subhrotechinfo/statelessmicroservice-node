const mv = require('mv');
var _ = require('lodash');
class File {

    constructor(file) {
        this.file = file;
    }
    uploadFile(data) {
        return new Promise((resolve, reject) => {
            if (_.isEmpty(this.file)) {
                reject('Please send file.');
            }
            let fileObject = [];

            for (var index = 0; index < this.file.file.length; index++) {
                let fileName = this.file.file[index].originalFilename.split(".");
                let ext = _.last(fileName);
                let imagePath = data && data.imagePath ? data.imagePath : `/public/images/`;

                let name = fileName[0] + Date.now().toString() + '.' + ext;
                let filePath = imagePath + name;

                fileObject.push({ "filePath": filePath, "fileName": name });

                mv(this.file.file[index].path, appRoot + filePath, { mkdirp: true }, function (err) {
                    if (err) {
                        reject(err);
                    }
                });
            }
            resolve(fileObject);

        });

    }
}
module.exports = File;