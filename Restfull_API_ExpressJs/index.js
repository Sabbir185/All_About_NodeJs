const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    {id: 1, name: 'a'},
    {id: 2, name: 'b'},
    {id: 3, name: 'c'},
];

app.get('/', (req, res) => {
    res.send( courses )
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send( req.query );
})


app.get('/api/course/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found, 404!")
    res.send( course );
})

// POST
app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body)
   
    if(result.error) return res.status(400).send( result.error.details[0].message )


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push( course );

    res.send( course );
})


// PUT
app.put('/api/course/update/:id', (req, res) => {
    // lookup the course
    // if not existing, return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found, 404!")

    // Validate
    // if invalid, return 400-bad request
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // })
    // const result = schema.validate(req.body, schema)

    const { error }  = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // Update course
    // return the update course
    course.name = req.body.name;
    res.send(course);
});


// delete
app.delete('/api/course/delete/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found, 404!")

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
})


// utilities
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course)
}



const port = process.env.PORT || 3000; // try export PORT=5000
app.listen(port, () => console.log(`Listening on port ${port}...`))