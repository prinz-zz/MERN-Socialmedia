const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const multer = require('multer'); 
const path = require('path');
const cors = require('cors');
dotenv.config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/post');




//DB connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Yay DB Connection established'))
    .catch((err) => console.log(err));

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));




//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));




const storage = multer.diskStorage({
    destination:  (req, file, cb) => { 
        cb(null,'public/assets')
    },

    filename: (req, file, cb) => { 
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully!')
    } catch (err) {
        console.log(err);
    }
})


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


app.listen(8800, () => {
    console.log('Backend is running');
});