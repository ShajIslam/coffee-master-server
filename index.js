const express = require("express");
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 8001;

// middleware

app.use(express.json());
app.use(cors());

//Coffee_Master
//upcMULhDniIdphU6



const uri = "mongodb+srv://Coffee_Master:upcMULhDniIdphU6@cluster0.1vqmal2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection
    const coffeeCollection = client.db('newCoffeeDb').collection('coffee');


    app.get('/coffee', async(req, res)=>{ 
        const cursor = coffeeCollection.find();
        const result  = await cursor.toArray();
        res.send(result);
    })

    app.get('/coffee/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await coffeeCollection.findOne(query);
        res.send(result);
    })

    app.post('/coffee', async(req, res)=>{
        const newCoffee = req.body;
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
    })

    app.delete('/coffee/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    console.log("Server Running Successfully...");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})


