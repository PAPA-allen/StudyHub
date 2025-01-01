
import app from "./app";
import connectDB from "./utils/db";

const PORT = process.env.PORT || 8000;

//connect to server
app.listen(PORT, () => {
    console.log(`Server is running with port ${PORT}`);
    connectDB()
})