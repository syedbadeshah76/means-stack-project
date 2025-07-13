  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mongoose = require('mongoose');
  let userHandler = require("./handlers/userHandlers");
  let materialHandler = require("./handlers/materialHandlers");
  let invoiceHandler = require("./handlers/invoiceHandlers");
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());


  mongoose.connect("mongodb://localhost:27017/MongooseDB").then(() => {
      console.log("Connected to MongoDB");
  }).catch((err) => {
      console.log("Error connecting to MongoDB", err);
  })

  app.post('/createUser', async (req, res) => {
    let userData = req.body;
    let user = await userHandler.CreateUser(userData);
    res.send(user);

    
  });
  app.put('/customerput', async (req, res) => {
      let customerData = req.body;
      let customer = await userHandler.editCustomer(customerData);
      res.send(customer);
  })
  app.get('/displayUser', async (req, res) => {
    let users = await userHandler.getUser();
    res.send(users);
      
  });

  app.post("/material", async (req, res) => {
      let materialData = req.body;
      let material = await materialHandler.CreateMaterial(materialData);
      res.send(material);
  });

  app.put('/materialput', async (req, res) => {
      let materialData = req.body;
      let material = await materialHandler.editMaterial(materialData);
      res.send(material);
  })
  app.get("/materialdisplay", async (req, res) => {
      let materials = await materialHandler.getMaterial();
      res.send(materials);
  });

  app.post("/saveInvoices", async (req, res) => {
      let invoiceData = req.body;
      let invoice = await invoiceHandler.createinvoice(invoiceData);
      res.send(invoice);

  });
  // app.get("/getInvoices", async (req, res) => {
  //     {
  //       // Use Mongoose model to fetch all invoices
  //       let invoices = await Invoice.find({});
  //       console.log("Invoices fetched successfully");
  //       res.send(invoices); // Send data back to the client
  //     }
  //   });
    
  app.get("/getInvoices", async (req, res) => {
      let invoices = await invoiceHandler.displayInvoices();
      res.send(invoices);
  });
  app.listen(3000, () => console.log("server is hosted on port 3000"))
