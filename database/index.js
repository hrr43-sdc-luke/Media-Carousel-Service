const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Experience = require('./experience.js');

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

const mongooseConnection = 'mongodb://localhost/fec-airbnb';

mongoose
  .connect(mongooseConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error: ', err));

const getExperiences = (expId, callback) => {
  Experience.find(expId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const createExperience = (newExp, callback) => {
  Experience.create(newExp, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const updateExperience = (experienceId, callback) => {
  Experience.updateOne(experienceId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const deleteExperience = (expId, callback) => {
  Experience.deleteOne(expId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  db,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
