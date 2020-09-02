const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.get('/', (req, res) => {
  res.json({ msg: 'WELCOME TO CONTACT KEEPER' });
});
app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.listen(PORT, () => console.log(`SERVER RUNNING AT PORT ${PORT}.`));
