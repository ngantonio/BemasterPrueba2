import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    loweracse: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  join_date: {
    type: Date,
    default: Date.now(),
  },

  avatar: String,
  created_at: Date,
  updated_at: Date,
});

// encrypt password on register
UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next(err);

  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  this.password = hash;
  next();
});

// compare password at login time
UserSchema.methods.toJSON = function () {
  const usr = this;
  const usrObject = usr.toObject();
  delete usrObject.password;

  return usrObject;
};

UserSchema.methods.comparePassword = async function (possiblePassword) {
  return await bcrypt.compareSync(possiblePassword, this.password);
};

export default mongoose.model("User", UserSchema);
