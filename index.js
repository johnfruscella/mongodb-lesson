const mongoose = require('mongoose');

const object = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost/playground', object)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to that MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/ 
    }, // Validators specific to Strings: minLength, maxLength, match (regex), enum
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
                // return v && v.length > 0; //prevents null value being passed in tags array
            },
            message: 'A course should have at least one tag.'
        }

    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },  //arrow functions don't have 'this' property so can't use here
        min: 10,
        max: 200
    } //Validation specific to Numbers: min and max
});
//Making Model. Create schema, compile into model which gives a class. Create object based on Class
//Classes, objects: objects are an instance of a Class. A class is a blueprint
//Course, nodeCourse
const Course = mongoose.model('Course', courseSchema); //Course is class, ergo Pascal naming convention

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) { //ex is for exception
        for (field in ex.errors)
            console.log(ex.error[field].message);
    };

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

async function updateCourse(id) {
    const result = await Course.updateOne({ _id: id }, { // NOTE: '.update' is deprecated use 'updateOne', updateMany, or bulkWrite instead
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });

    console.log(result);

}
async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = Course.findByIdAndRemove(id);
    //console.log(result);
    console.log(course);

}
//updateCourse('5e39f45001a7d31e0064dcc3');
//removeCourse('5e39f45001a7d31e0064dcc3');
//getCourses();
createCourse();
