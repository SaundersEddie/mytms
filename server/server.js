const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
require ('dotenv').config();

// Setup express sections
const app = express();
app.use(express.json());
// app.use(cors());

// Setup port and database connection, we'll open the API server once we have a connection to the database
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`Server running on port: ${PORT}`));

mongoose.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true })
    .then (()  => console.log (`Database Connected`))
    .catch((error) => console.log (`There was an error connecting to the database: ${error.message}`));

    // This part will carry on executing
    console.log ("Fnork");


    // Route setup

    app.use("/user", require("./routes/userRouter"));
