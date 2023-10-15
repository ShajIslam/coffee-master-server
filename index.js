const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// middleware

app.express(express.json());
app.cors(cors());



app.get('/', (req, res)=>{
    console.log("Server Running Successfully...");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})


