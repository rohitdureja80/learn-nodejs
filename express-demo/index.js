
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());  // adds a piece of middleware 

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
}); 

app.get('/api/courses/:id', (req, res) => {
    //res.send(`course id: ${req.params.id}`);
    //res.send(req.query); // show all query parameters
    //res.send(req.params); // show all path parameters 
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    
    // validate the request 
    const { error } = validateCourse(req.body);
    
    if (error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    let newId = courses.length + 1;
    const course = {
        id: newId, 
        name: req.body.name + newId.toString()
    };
    courses.push(course);
    res.send(courses);
})

app.put('/api/courses/:id', (req, res) => {
    // look for the course 
    // if it doesn't exist return 404
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found.');

    // validate the request 
   const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // update the course 
    // return the updated course 
    course.name = req.body.name; 
    res.send(courses);

});

function validateCourse(course) {
    
    // validate the request 
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);   
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
