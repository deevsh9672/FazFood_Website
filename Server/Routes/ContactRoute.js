// ContactRoute.js
const express = require('express');
const router = express.Router();
const ContactController = require("../Controller/ContactContaller");

// Define routes
router.post('/contact', ContactController.Contact);
 // show data 
  router.get('/show/:id', ContactController.GetContact)
  router.get('/delete/:id', ContactController.DeleteContact)

module.exports = router;
 