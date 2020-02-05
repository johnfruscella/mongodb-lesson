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


async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })  //1 sorts name is ascending order. -1 for descending
        .select({ name: 1, tags: 1 });
        //.countDocuments(); // returns the number of documents in the database. countDocuments() replaces the deprecated count(). 
    console.log(courses);
};

async function updateCourse(id){
    // First approach called Query first
    // 1. findById()
    // 2. Modify its properties
    // save()
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
    
}
updateCourse('5e39f45001a7d31e0064dcc3');
//getCourses();
//createCourse();
