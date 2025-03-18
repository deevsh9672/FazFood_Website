const User1 = require('../Models/Contact');
const bcrypt = require('bcryptjs');

module.exports.Contact = async (req, res) => {
    try {
        const { name, email, phone, comment } = req.body;

        // Validate input fields
        if (!name || !email || !phone || !comment) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the contact already exists
        const existContact = await User1.findOne({ email });
        if (existContact) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new contact
        const user = await User1.create({ 
            name, 
            email, 
            phone, 
            comment, 
            createdAt: new Date() 
        });

        // Generate token if necessary
        const token = user.generateAuthToken(); // Ensure this method exists
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Internal server error" });
    }
};  

//get all users

module.exports.GetContact =async(req,res)=>{
    try{
        const contactId = req.params.id;
        const contact =await User1.findById(contactId);

        if(!contact) return res.status(404).json({message :'user not found'});
         res.status(200).json({message:'User fecthed successfully.' , data: contact});
    } catch(err){
        console.error(err);
        res.status(500).json({message:err.message || 'Server error' })
    }
}
  

// Delete users
  module.exports.DeleteContact =async (req,res) =>{
    try{
        const contactId = req.params.id;
        const result = await User1.findByIdAndDelete(contactId);
         if(!result) return res.status(404).json({message: 'user not found'});

          res.status(200).json({message:'user deleted succesfully.'});
    } catch(err){
        console.error(err);
        res.status(500).json({message:'server error'});
    }
  }