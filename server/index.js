const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const controller = require('./controller/experience');

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.engine('html', ejs.renderFile);

app.get('/:id', (req, res) => {
  res.render('../public/index.html');
});

app.get('/api/experiences/:id', (req, res) => {
  controller.getExperience(req.params.id, (err, data) => {
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
  controller.createExperience(req.body, (err, data) => {
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
  controller.updateExperience(req.body, (err, data) => {
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
  controller.deleteExperience(req.params.id, (err, data) => {
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
