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

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb://localhost:27017/health`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// console.log(uri)
async function run() {
  try {
    await client.connect();
    console.log("connected to db");

    const database = client.db("SehatBlend");
    const AppointmentsCollection = database.collection("Appointments");
    const doctorsCollection = database.collection("doctors"); // Add this line

    // Handle errors for database operations
    const handleDatabaseError = (res, error) => {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error occurred" });
    };

    // Route to add a new doctor to a specific hospital
    app.post("/doctors", async (req, res) => {
      try {
        const doctorData = req.body;
        const hospitalId = doctorData.hospitalId; // Assuming hospitalId is provided in the request body
        
        // Create or get a reference to the collection for the hospital
        const hospitalCollectionName = `doctors`; // Naming convention for the doctor sub-collection
        const hospitalCollection = database.collection(hospitalCollectionName);
        
        // Modify doctor data to include image buffer
        const pic = req.files.image[0];
        const picData = pic.data;
        const encodedPic = picData.toString("base64");
        const imageBuffer = Buffer.from(encodedPic, "base64");
        doctorData.image = imageBuffer;

        // Insert the doctor into the hospital-specific collection
        const result = await hospitalCollection.insertOne(doctorData);
        res.json(result);
      } catch (error) {
        handleDatabaseError(res, error);
      }
    });

    // Route to get all approved doctors
    app.get("/approvedDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "true" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });

    // Route to get all pending doctors
    app.get("/pendingDoctors", async (req, res) => {
      const cursor = doctorsCollection.find({ approved: "false" });
      const doctors = await cursor.toArray();
      res.json(doctors);
    });

    // Route to delete a doctor by id
    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await doctorsCollection.deleteOne(query);
      res.json(result);
    });

    app.put("/doctors/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const updatedData = req.body;
    
        console.log("Doctor ID:", id);
        console.log("Updated Data:", updatedData);
    
        // Log MongoDB connection status
        console.log("MongoDB Connected:", client.isConnected());
    
        // Update the doctor's details
        const result = await doctorsCollection.updateOne(query, { $set: updatedData });
    
        console.log("MongoDB Update Result:", result);
    
        if (result.modifiedCount === 0) {
          throw new Error("Failed to update doctor data");
        }
    
        res.json(result);
      } catch (error) {
        console.error("Error updating doctor data:", error);
        res.status(500).json({ error: "Failed to update doctor data" });
      }
    });
    
    

    // Route to approve a doctor
    app.put("/approve/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // Make approved true
      const result = doctorsCollection.updateOne(query, { $set: { approved: "true" } });
      res.json(result);
    });

    // Route to get a doctor by email
    app.get("/doctors/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = doctorsCollection.find({ email });
      const doctor = await cursor.toArray();
      res.json(doctor);
    });

    // Route to add an appointment
    app.post("/appointments", async (req, res) => {
      const appointment = req.body;
      const result = await AppointmentsCollection.insertOne(appointment);
      res.json(result);
    });

    // Route to get all appointments
    app.get("/appointments", async (req, res) => {
      const cursor = AppointmentsCollection.find({});
      const appointments = await cursor.toArray();
      res.json(appointments);
    });

    // Route to add a new patient to a specific hospital
    app.post("/patients", async (req, res) => {
      try {
        const patientData = req.body;
        const hospitalId = patientData.hospitalId; // Assuming hospitalId is provided in the request body
        
        // Create or get a reference to the collection for the hospital
        const hospitalCollectionName = `patients`; // Naming convention for the patient sub-collection
        const hospitalCollection = database.collection(hospitalCollectionName);
        
        // Insert the patient into the hospital-specific collection
        const result = await hospitalCollection.insertOne(patientData);
        res.json(result);
      } catch (error) {
        handleDatabaseError(res, error);
      }
    });

    // Route to delete a patient by id 
    app.delete("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await AppointmentsCollection.deleteOne(query);
      res.json(result);
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
