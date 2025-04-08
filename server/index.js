const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client')));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));


app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));