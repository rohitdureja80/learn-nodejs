const Joi = require('joi');
const express = require('express');
const app = express(); 

app.use(express.json());

const genres = [
    { genreId: 1, genre: 'Comedy'},
    { genreId: 2, genre: 'Drama'},
    { genreId: 3, genre: 'Action'},
    { genreId: 4, genre: 'Horror'},
    { genreId: 5, genre: 'Thriller'},
    { genreId: 6, genre: 'Documentary'}
];

// GET all movie genres 
app.get('/api/genres/', (req, res) => {
    res.send(genres);
});

// GET single movie genre given a genre id 
app.get('/api/genres/:genreId', (req, res) => {
    const genre = genres.find(x => x.genreId === parseInt(req.params.genreId));
    if (!genre) 
        return res.status(404).send(`Could not find genre associated with genre id ${req.params.genreId}.`)
    res.send(genre);
});

// POST new movie genre 
app.post('/api/genres/', (req, res) => {

    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let id = genres.length + 1;
    const genre = {
        genreId: id, 
        genre: req.body.genre
    };
    genres.push(genre);
    res.send(genres);
});


// PUT (update) movie genre given genre id
app.put('/api/genres/:genreId', (req, res) => {
    
    // check if genre id exists 
    const genre = genres.find(x => x.genreId === parseInt(req.params.genreId));
    if (!genre) 
        return res.status(404).send(`Could not find genre associated with genre id ${req.params.genreId}.`)

    // validate the request 
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genres);
})


// DELETE movie genre given a genre id 
app.delete('/api/genres/:genreId', (req, res) => {
    // check if genre id exists 
    const genre = genres.find(x => x.genreId === parseInt(req.params.genreId));
    if (!genre) 
        return res.status(404).send(`Could not find genre associated with genre id ${req.params.genreId}.`)

    // find index of genre id 
    let index = genres.indexOf(x => x.genreId == req.params.genreId);
    genres.splice(index, 1);
    res.send(genres);
})

function validateGenre(genre) {
    
    // genre schema 
    const schema = Joi.object({
        genre: Joi.string()
            .min(3)
            .max(30)
            .required()
    });
    return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
