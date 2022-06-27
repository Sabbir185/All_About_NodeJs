const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("DB error: ", err));

// schema design
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 300,
    required: true,
  },
  category: {
    enum: ["web", "mobile"],
    lowercase: true,
    // uppercase: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 300,
    required: function () {
      return this.isPublished;
    },
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);


// APIs
async function createObj() {
  const course = new Course({
    name: "Reactjs course",
    author: "Sabbir",
    tags: ["reactjs", "frontend"],
    isPublished: true,
  });

  await course.save();
}

// createObj();

async function getCourse() {
  const courses = await Course.find({ author: "Sabbir", isPublished: true })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

// getCourse()

// 1
async function getall() {
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}

// 2 --> using or operator
async function getFB() {
  const courses = await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });

  console.log(courses);
}

// 2 --> using in operator
async function getFBIn() {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort("-price")
    .select("name author price");

  console.log(courses);
}

// 3
async function getLast() {
  const courses = await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");

  console.log(courses);
}

// getall()
// getFB()
// getFBIn();
// getLast()

// update
async function updateOne(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = false;
  course.name = "Another cccccccccc";

  const res = await course.save();

  console.log(res);
}

// update
async function updateTwo(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        name: "ABCD",
        isPublished: true,
      },
    },
    { new: true }
  ); // new = true for resolve new updated doc

  console.log(course);
}

// updateTwo('62b98059eaa5c737bd17aa66')

// delete
async function deleteCOurse(id) {
  const course = await Course.findByIdAndRemove(id); // new = true for resolve new updated doc
  console.log(course); // not doc found it will return null
}

// deleteCOurse("62b98059eaa5c737bd17aa66");
