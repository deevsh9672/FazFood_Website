const bcrypt = require('bcryptjs');
const User = require('../Models/SigupModel');
 

//Create data
module.exports.Signup = async (req, res) => {
    

    try {
        const { email, password, firstname,lastname, createdAt } = req.body; // frontend sends data
        const existingUser = await User.findOne({ email });

        
        if (existingUser) return res.status(400).json({ message: "User already exists" }); 

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);
        // const hashedPassword = await bcrypt.md5(password, 12);


        const user = await User.create({ email, password: hashedPassword, firstname,lastname, createdAt });
     
        const token = user.generateAuthToken();
      // res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//get all users 

// module.exports.getUserById = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'User fetched successfully.', data: user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

module.exports.PutUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully.', data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

// module.exports.DeleteUsers = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const result = await User.findByIdAndDelete(userId);

//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Login


module.exports.loginUsers = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password });  // Log incoming data

    try {


        
        const user = await User.findOne({ email });
  

        if (!user) {
            console.log('No user found with this email');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        git clone https://github.com/deevsh9672/FazFood_Website_Project.git
        cd repository
        
   

        const isMatch = await user.comparePassword(password);

        // console.log(isMatch);




        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

      


        // console.log('JWT_SECRET:', process.env.JWT_SECRET); 
        
        const token = user.generateAuthToken();

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message:err.message||'Internal server error' });
    }
};
