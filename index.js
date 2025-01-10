const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());
// DATABASE

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zovp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const menuCollection = client.db("BistroDB").collection("Menu");
    const reviewsCollection = client.db("BistroDB").collection("reviews");
    const CartCollection = client.db("BistroDB").collection("Cart");
    const userCollection = client.db("BistroDB").collection("users");

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });
    // --Carts COllection
    app.get("/cart", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };

      const result = await CartCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/cart", async (req, res) => {
      const cartItem = req.body;
      const result = await CartCollection.insertOne(cartItem);
      res.send(result);
    });
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await CartCollection.deleteOne(query);
      res.send(result);
    });
    // Users Related Api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query={email:user.email}
      console.log(query);
      const existingUser=await userCollection.findOne(query)
      if(existingUser){
        return res.send({massage:"user already exist",insertedId:null})
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
