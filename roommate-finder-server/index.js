const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@roommate-finder.kl8d54e.mongodb.net/?retryWrites=true&w=majority&appName=roommate-finder`;

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
        //await client.connect();

        const findRoommateCollection = client.db('findRoommateDB').collection('findRoommate');
        const usersCollection = client.db('findRoommateDB').collection('users');

        //data get
        app.get('/addtofindroommate', async (req, res) => {
            const result = await findRoommateCollection.find().toArray();
            res.send(result);
        })

        //single data get by id
        app.get('/addtofindroommate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await findRoommateCollection.findOne(query);
            res.send(result)
        })
        
        //data post
        app.post('/addtofindroommate', async (req, res) => {
            const newaddtofindroommate = req.body;
            const result = await findRoommateCollection.insertOne(newaddtofindroommate);
            res.send(result);
        })

        //data put
        app.put('/addtofindroommate/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedFindRoommate = req.body;
            const updatedDoc = {
                $set: updatedFindRoommate
            }
            const result = await findRoommateCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        //data delete
        app.delete('/addtofindroommate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await findRoommateCollection.deleteOne(query);
            res.send(result);
        })

        //user profile API
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.get('/users/photourl', async (req, res) => {
            try {
                const email = req.query.email;

                if (!email) {
                    return res.status(400).json({ message: "Email is required" });
                }

                const user = await usersCollection.findOne({ email });

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.json({ photourl: user.photourl });
            } catch (error) {
                console.error("Error fetching user profile:", error);
                res.status(500).json({ message: "Server error" });
            }
        });

        app.post('/users', async (req, res) => {
            const userProfile = req.body;
            console.log(userProfile);
            const result = await usersCollection.insertOne(userProfile);
            res.send(result);
        })

        app.patch('/users', async (req, res) => {
            const { signInInfo, lastSignInTime } = req.body;
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    lastSignInTime: lastSignInTime
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Roommate finder server is running')
})

app.listen(port, () => {
    console.log(`Roommate finder server is running on port ${port}`)
})