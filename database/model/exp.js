
const hrtime = require('process.hrtime');
const client = require('../');

let arrayOfValues = [];

const buildNewExpArray = (newExp) => {
  arrayOfValues = [
    newExp.title,
    newExp.city,
    newExp.state,
    newExp.country,
    newExp.category,
    newExp.activity,
    parseInt(newExp.averageRating, 10),
    parseInt(newExp.numberOfReviews, 10),
    parseInt(newExp.duration, 10),
    parseInt(newExp.groupSize, 10),
    newExp.includes,
    newExp.cuisine,
    newExp.hostedLanguages,
    parseInt(newExp.costPerPerson, 10),
    newExp.imageUrls,
    newExp.videoUrl,
  ];

  return arrayOfValues;
};

const getExp = (expId, callback) => {
  const selectQuery = {
    text: 'SELECT * FROM experiences WHERE experienceId = $1',
    values: [expId],
  };

  const timer = hrtime();
  client.query(selectQuery, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Execution time: ${hrtime(timer, 's')}`);
      callback(null, res.rows);
    }
  });
};

const createExp = (newExp, callback) => {
  const columns = 'title, city, state, country, category, activity, averageRating, numberOfReviews, duration, groupSize,includes, cuisine, hostedLanguages, costPerPerson, imageUrls,videoUrl';
  const params = '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16';
  const selectQuery = {
    text: `INSERT INTO experiences (${columns}) VALUES (${params})`,
    values: buildNewExpArray(newExp),
  };

  const timer = hrtime();
  client.query(selectQuery, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Execution time: ${hrtime(timer, 's')}`);
      callback(null, res.insertId);
    }
  });
};

const updateExp = (newExp, callback) => {
  buildNewExpArray(newExp);
  arrayOfValues.push(newExp.experienceid);
  const selectQuery = {
    text: `UPDATE experiences
      SET title = $1,
      city = $2,
      state = $3,
      country = $4,
      category = $5,
      activity = $6,
      averageRating = $7,
      numberOfReviews = $8,
      duration = $9,
      groupSize = $10,
      includes = $11,
      cuisine = $12,
      hostedLanguages = $13,
      costPerPerson = $14,
      imageUrls = $15,
      videoUrl = $16
      WHERE experienceId = $17`,
    values: arrayOfValues,
  };

  const timer = hrtime();
  client.query(selectQuery, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Execution time: ${hrtime(timer, 's')}`);
      callback(null, res);
    }
  });
};

const deleteExp = (expId, callback) => {
  const selectQuery = {
    text: 'DELETE FROM experiences WHERE experienceId = $1',
    values: [expId],
  };

  const timer = hrtime();
  client.query(selectQuery, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Execution time: ${hrtime(timer, 's')}`);
      callback(null, res);
    }
  });
};

module.exports = {
  getExp,
  createExp,
  updateExp,
  deleteExp,
};
