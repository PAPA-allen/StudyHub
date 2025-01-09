
import app from "./app";
import connectDB from "./utils/db";
import {v2 as cloudinary} from 'cloudinary';
const PORT = process.env.PORT || 8000;



//save cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
 })


//connect to server
app.listen(PORT, () => {
    console.log(`Server is running with port ${PORT}`);
    connectDB()
})