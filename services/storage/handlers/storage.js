var { nanoid } = require("nanoid");
var ID = nanoid();

const upload = async (req, res) => {
    try {
        let fileTypes = ['image/png', 'image/jpg', 'image/tif', 'image/jpeg', 'image/gif', 'image/webp'];
        let maxFileSize = 2 * 1024 * 1024;
        if (!fileTypes.includes(req.files.picture.mimetype)) {
            return res.status(400).send('Unsupported image format!');
        }

        if (maxFileSize < req.files.picture.size) {
            return res.status(400).send('Image size must be of maximum 2 mb size!');
        }

        let newFileName = `${ID}__${req.files.picture.name}`;
        let uploadedPath = `${__dirname}/../../../uploads/${newFileName}`;
        await req.files.picture.mv(uploadedPath);
        return res.status(201).send({ fileName: newFileName });
    } catch (error) {
        console.log(error);
        return res.status(500).send('ISE');
    }
};

const download = async (req, res) => {
    try {
        let filePath = `${__dirname}/../../../uploads/${newFileName}`;

        return res.download(filePath, req.params.file.split('__')[1]);
    } catch (error) {
        console.log(error);
        return res.status(500).send('ISE');
    }
};

module.exports = {
    upload,
    download
};