// require modules for our User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required"
    },
    
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email is required"
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required"
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "users"
  }
);

// configure options for the UserSchema

let options = ({
    missingPasswordError: "Wrong / Missing Password"
});

usersSchema.plugin(passportLocalMongoose, options);

module.exports.Users = mongoose.model('Users', usersSchema);