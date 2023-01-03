const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    minlength: 3,
    type: String,
  },
  number: {
    minlength: 8,
    validate: {
      validator: (v) => /[0-9]{2,3}-[0-9]{7,10}/.test(v),
      message: 'Phone number must be in the form /[0-9]{2,3}-[0-9]{7,10}/',
    },
    type: String,

  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('person', personSchema);
