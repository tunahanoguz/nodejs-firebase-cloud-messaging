const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const notification = require('./notification');

app.use(bodyParser.json());
app.use(cors());

app.use('/notifications', notification);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
