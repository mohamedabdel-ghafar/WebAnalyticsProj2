const express = require('express');
const multer = require('multer');
// const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 3000;

app.use(express.static('public'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({   storage: storage,
                        limits: { fileSize: '50mb' }}).single('photo');

app.post('/upload', upload.single('photo'), (req, res) => {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});