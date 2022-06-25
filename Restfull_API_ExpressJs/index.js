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
    const crs = courses.find( c => c.id === parseInt(req.params.id));
    if(!crs) res.status(404).send("Course not found, 404!")
    res.send( crs );
})

// POST
app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body)
   
    if(result.error) {
        res.status(400).send( result.error.details[0].message )
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push( course );

    res.send( course );
})


const port = process.env.PORT || 3000; // try export PORT=5000
app.listen(port, () => console.log(`Listening on port ${port}...`))