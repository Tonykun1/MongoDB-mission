const express = require('express');
const router = require('./Services/webServices');
const PORT=4852;
const connectDB = require('./Services/db');

const app = express();
connectDB();
app.use(express.json());
app.use('/api', router); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
