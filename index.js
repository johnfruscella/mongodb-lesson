const mongoose = require('mongoose');

const object = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost/playground', object)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to that MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
//Making Model. Create schema, compile into model which gives a class. Create object based on Class
//Classes, objects: objects are an instance of a Class. A class is a blueprint
//Course, nodeCourse
async function createCourse() {
    const Course = mongoose.model('Course', courseSchema); //Course is class, ergo Pascal naming convention
    const course = new Course({
        name: 'Chemistry Course',
        Author: 'Dawkins',
        tags: ['atoms', 'inorganic'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}
createCourse();
