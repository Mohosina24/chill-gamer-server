const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ipq1mm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    
    const watchListCollection = client.db('gamerDB').collection('watchList');
    const gamerCollection = client.db('gamerDB').collection('gamer');
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
  // watchList
     app.get('/watchList',async(req,res)=>{
      const email = req.query.email;
      const result = await watchListCollection.find({email}).toArray();
      res.send(result);
     })

         // delete method for watchList
    app.delete('/watchList/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await watchListCollection.deleteOne(query);
      res.send(result);
    })
    // id dhore data pawyar jonno 
    app.get('/gamers/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await gamerCollection.findOne(query);
      res.send(result);
    })
    
// sob data pawyar jonno 
    app.get('/gamers',async(req,res)=>{
        const cursor = gamerCollection.find();
        const result= await cursor.toArray();
        res.send(result);
    })
    app.delete('/gamer/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await watchListCollection.deleteOne(query);
      res.send(result);
    })

    // for watchList
    app.post ('/watchList',async(req,res)=>{
      const watchItem = req.body;
      const result = await watchListCollection.insertOne(watchItem);
      res.send(result);
    })
// data create are jonno 
    app.post('/gamers',async(req,res)=>{
        const newGamer = req.body;
        console.log(newGamer);
        const result = await gamerCollection.insertOne(newGamer);
        res.send(result)
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



app.get('/',(req,res)=>{
    res.send('chill gamer server is running');
})

app.listen(port,()=>{
    console.log(`chill gamer server is running on port: ${port}`)
})