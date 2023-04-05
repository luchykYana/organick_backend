const path = require('path');
const fs = require('fs/promises');

const {ErrorHandler, errors} = require('../errors');

const {NOT_FOUND_IMAGE} = errors;

module.exports = {
    getImage: async (req, res, next) => {
        try {
            const {image} = req.params;

            const imageFolder = path.join(path.parse(__dirname).dir, 'public', 'images');
            const files = await fs.readdir(imageFolder);

            if (!files.includes(image)) {
                throw new ErrorHandler(NOT_FOUND_IMAGE.message, NOT_FOUND_IMAGE.code);
            }

            res.sendFile(path.join(imageFolder, image));
        } catch (e) {
            next(e);
        }
    }
}