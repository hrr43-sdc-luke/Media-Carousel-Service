const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const db = require('../database/index.js');

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.engine('html', ejs.renderFile);

const buildNewExp = (req) => {
  const experienceId = parseInt(req.body.experienceId, 10);
  const averageRating = parseInt(req.body.averageRating, 10);
  const numberOfReviews = parseInt(req.body.numberOfReviews, 10);
  const duration = parseInt(req.body.duration, 10);
  const groupSize = parseInt(req.body.groupSize, 10);
  const costPerPerson = parseInt(req.body.costPerPerson, 10);
  const newExp = {
    experienceId,
    title: req.body.title,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    category: req.body.category,
    activity: req.body.state,
    averageRating,
    numberOfReviews,
    duration,
    groupSize,
    includes: req.body.includes,
    cuisine: req.body.cuisine,
    hostedLanguages: req.body.hostedLanguages,
    costPerPerson,
    imageUrls: req.body.imageUrls,
    videoUrl: req.body.videoUrl,
  };
  return newExp;
};

app.get('/:id', (req, res) => {
  res.render('../public/index.html');
});


app.get('/api/experiences/:id', (req, res) => {
  const expId = {
    experienceId: parseInt(req.params.id, 10),
  };

  db.getExperiences(expId, (err, data) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/api/experiences/', (req, res) => {
  db.createExperience(buildNewExp(req), (err, data) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

app.put('/api/experiences/:id', (req, res) => {
  db.updateExperience(buildNewExp(req), (err, data) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/api/experiences/:id', (req, res) => {
  const expId = {
    experienceId: parseInt(req.params.id, 10),
  };

  db.deleteExperience(expId, (err, data) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
