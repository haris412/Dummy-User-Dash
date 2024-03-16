const express = require('express');
const app = express();
const cors = require('cors');
const port = 3011;
app.use(cors())

let users = require('./users.json');

app.get('/users', (req, res) => {
    const newUsers = users.map(user => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            age: user.age,
            city: user.address.city,
            state: user.address.state,
        };
    });
    res.json(newUsers);
});

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});