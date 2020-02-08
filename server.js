const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// connect to databse
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB CONNECTION ERROR: ' + err));

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cors()); // allow all origins
if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: 'http://localhost:3000' }));
}

// middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('API is running on port ' + PORT);
});
