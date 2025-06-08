const  mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
        role: {
			type: String,
			default: "user",
		},
        
},{
		timestamps: true,
	});
    
    const User = mongoose.model("User", userSchema);
module.exports = User;
