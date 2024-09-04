import express from "express";
import path from "path";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from './routes/productRoutes.js'
import connectDb from "./config/db.js";
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'
dotenv.config()


const allowedOrigins = [
    'https:sample-ecommerce-app.onrender.com',
    'http://localhost:5173'
];
const app = express()

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
}));
const port = process.env.PORT;
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
}

)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})