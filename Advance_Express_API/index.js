const Joi = require('joi');
const debug = require('debug')('app:startUp');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const logger = require('./logger')
const path = require('path');

const app = express();


// Middleware
app.use( logger );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.static(path.resolve(__dirname, 'public', 'photos')));
app.use(helmet());

/**
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)  // default -> undefined
    console.log(`app: ${ app.get('env') }`)             // default -> development
*/

if( app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled..')
}

console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
console.log('Mail Pass: '+ config.get('mail.password'));

debug('hello')  //alternative -> console.log

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