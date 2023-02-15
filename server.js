const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/simon-game', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define the route for saving the user's record
app.post('/api/record', (req, res) => {
  const { record } = req.body;
  const newRecord = new Record({ record });

  newRecord.save()
    .then(() => res.json('Record added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});