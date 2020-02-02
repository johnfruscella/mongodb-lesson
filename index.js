const mongoose = require('mongoose');

const object = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
};
mongoose.connect('mongodb://localhost/playground', object)
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to that MongoDB...', err));

