// Simplifies working with mongodb
const mongoose = require('mongoose')

// Connects to DB
// returns a promise
mongoose
  .connect('mongodb://localhost/play', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect', err))

// schema is part of mongoose
const courseSchema = new mongoose.Schema({
  name: String,
  auther: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

// Whats a modal here exactly, what is this?
const Course = mongoose.model('course', courseSchema)

// ?
async function createCourse () {
  const course = new Course({
    name: 'Node.js Course 3',
    auther: 'Mosh',
    tags: ['node', 'backend']
  })

  const result = await course.save()
  console.log(result)
}

// createCourse();

// Returns JSON object of courses
async function getCourses () {
  const courses = await Course.find({ auther: 'Mosh' })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1 })
  console.log('find', courses)
}

getCourses()
