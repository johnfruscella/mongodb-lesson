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
    //Comparison Operators: use $ in front to indicate use of operator (e.g. $gt)
    // eq (equal)
    // ne (not equal)
    // gt (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true })
        //.find({ price: { $gte: 10, $lte: 20 } }) find course between 10 and 20
        .find({ price: { $in: [10, 15,20] } }) // find course at value 10, 15, and 20
        .limit(10)
        .sort({ name: 1 })  //1 sorts name is ascending order. -1 for descending
        .select({ name: 1, tags: 1 });
    console.log(courses);
};

getCourses();
