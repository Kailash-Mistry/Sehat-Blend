const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { response } = require("express");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const fileUpload = require("express-fileupload");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json());

const uri = `mongodb://localhost:27017/health`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function run() {
  try {
    await client.connect();
    console.log("connected to db");

    const database = client.db("SehatBlend");
    const doctorsCollection = database.collection("doctors");
    const AppointmentsCollection = database.collection("Appointments");

    app.get("/doctors", async (req, res) => {
      const cursor = doctorsCollection.find({});
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    app.get("/approvedDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "true" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    app.get("/pendingDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "false" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });
    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await doctorsCollection.deleteOne(query);
      res.json(result);
    });
    app.put("/approve/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = doctorsCollection.updateOne(query, { $set: { approved: "true" } });
      res.json(result);
    });
    app.get("/doctors/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = doctorsCollection.find({ email });
      const doctor = await cursor.toArray();
      res.json(doctor);
    });

    app.post("/appoinments", async (req, res) => {
      const appointment = req.body;
      const result = await AppointmentsCollection.insertOne(appointment);
      res.json(result);
    });
    app.get("/appointments", async (req, res) => {
      const cursor = AppointmentsCollection.find({});
      const appointments = await cursor.toArray();
      res.json(appointments);
    });
    
    app.post("/doctors", async (req, res) => {
      const doctor = req.body;
      const pic = req.files.image[0];
      const picData = pic.data;
      const encodedPic = picData.toString("base64");
      const imageBuffer = Buffer.from(encodedPic, "base64");
      doctor.image = imageBuffer;
      const result = await doctorsCollection.insertOne(doctor);
      res.json(result);
    });

    app.get('/patients/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await AppointmentsCollection.findOne(query)
      res.json(result);
    })
    app.delete("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await AppointmentsCollection.deleteOne(query);
      res.json(result);
    });
    
    app.post('/api/signup', async (req, res) => {
      try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
      }
    });
    
    app.post('/api/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
      }
    });

    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
