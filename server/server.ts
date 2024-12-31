import app from "./app";

const PORT = process.env.PORT || 8000;

//connect to server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})