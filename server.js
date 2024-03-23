// require
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Products = require('./models/Products');
const mongoose = require('mongoose');
//
const app = express();
const PORT = 3000;
//
//Kết nối mongodb
const uri = 'mongodb+srv://admin:nxb29122k4@cluster0.t3xxdmo.mongodb.net/md18309';
mongoose.connect( uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Kết nối thành công đến server");
}).catch((err)=>{
    console.error(err);
});
//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        let fileName = file.originalname;
        let newFileName = fileName;
        // arr = fileName.split('.');

        // let newFileName = '';

        // for (let i =0; i< arr.length; i++) {
        //     if (i != arr.length - 1) {
        //         newFileName += arr[i];
        //     } else {
        //         newFileName += ('-' + Date.now() + '.' + arr[i]);
        //     }
        // }

        cb(null, newFileName)
    }
})
const upload = multer({ storage: storage });
//
//Chạy server
app.listen(PORT, () => {
    console.log(`Server is running the port ${PORT}`);
});
//
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})

// port ảnh
app.post('/upload-file', upload.single('my-file') , async (req, res, next) => {
    let file = req.file;
    if (!file) {
        let error = new Error(`Cần chọn file tải lên!`);
        error.httpStatusCode = 400;
        return next (error)
    }

    let pathFileInServer = file.path;
    console.log(pathFileInServer);

    // res.send(file)

    // let productsBody = req.body;

    // const urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    const newProducts = new Products({
        hinhanh: pathFileInServer,
        ten: "Xuân Bắc - PH44315"
    })

    let products = await Products.create(newProducts);

    res.send(products)
});

