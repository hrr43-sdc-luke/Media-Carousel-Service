const experience = require('../../database/model/exp');

exports.getExperience = (expId, callback) => {
  experience.getExp(parseInt(expId, 10), (err, data) => {
    if (err) {
      callback(err, []);
    } else {
      callback(null, data);
    }
  });
};

exports.createExperience = (expInfo, callback) => {
  experience.createExp(expInfo, (err, data) => {
    if (err) {
      callback(err, []);
    } else {
      callback(null, data);
    }
  });
};

exports.updateExperience = (expInfo, callback) => {
  experience.updateExp(expInfo, (err, data) => {
    if (err) {
      callback(err, []);
    } else {
      callback(null, data);
    }
  });
};

exports.deleteExperience = (expId, callback) => {
  experience.deleteExp(parseInt(expId, 10), (err, data) => {
    if (err) {
      callback(err, []);
    } else {
      callback(null, data);
    }
  });
};
