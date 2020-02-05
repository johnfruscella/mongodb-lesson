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
const Course = mongoose.model('Course', courseSchema); //Course is class, ergo Pascal naming convention
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}
//createCourse();

async function getCourses() {
        // Regular Expressions (Regex)

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        // find authors that start with 'Mosh'
        //.find({author: /^Mosh/})
        // ends with Hamedani
       // .find({author: /Hamedani$/i})
        // contains Mosh anywhere in the string
        //.find({author: /.*Mosh.*/}) //.* in front means 0 or more chars in front of regex pattern, .* at end means 0 or more at end.
        .limit(10)
        .sort({ name: 1 })  //1 sorts name is ascending order. -1 for descending
        //.select({ name: 1, tags: 1 });
        .countDocuments(); // returns the number of documents in the database. countDocuments() replaces the deprecated count(). 
    console.log(courses);
};

getCourses();
