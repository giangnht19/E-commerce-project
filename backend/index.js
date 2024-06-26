const port = 4000;
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://giangnguyenhtwork:giangnht19@cluster0.yb14si8.mongodb.net/fashfrenzy")

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is up and running");
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Successfully running, listening on port " + port);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
})


// Image Storage Engine
const storage = multer.diskStorage({    
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

// Creating Upload Endpoints
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating product
const productSchema = mongoose.model("product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

app.post("/addproduct", async (req, res) => {
    let products = await productSchema.find({});
    // console.log(products);
    let id;
    if (products.length > 0) {
        let lastProduct = products.slice(-1)[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }
    const product = new productSchema({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    product.save();
    console.log("Success");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for deleting product
app.post("/deleteproduct", async (req, res) => {
    await productSchema.findOneAndDelete({ 
        id: req.body.id 
    });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting all product
app.get("/allproducts", async (req, res) => {
    let products = await productSchema.find({});
    console.log("All Products Fetched Successfully");
    res.send(products);
})