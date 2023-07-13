const mongoose = require("mongoose");

const AUTHSCHEMA = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const AUTHmodel = mongoose.model("auth", AUTHSCHEMA);

module.exports = {
  AUTHmodel,
};
