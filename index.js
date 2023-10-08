const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');


let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    //  Image name
    let imageName = date.getDate() + date.getTime() + file.name;
    //  Image upload path
    let path = 'public/uploads/' + imageName;

    //  Create upload
    file.mv(path, (err, result) => {
        if (err){
            throw err;
        } else{ //  Our Image upload path
            res.json(`uploads/${imageName}`);
        }
    });
});


app.listen('3000', () => {
    console.log("Server is running on port 3000.");
});