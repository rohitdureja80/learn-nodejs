
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
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    //const result = Joi.valid(req.body, schema);
    console.log(result);

    if (result.error)
    {
        res.status(400).send(result.error);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
