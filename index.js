import express from 'express';
import fs from 'fs';

const app = express();

const readData = () => {
   
        try {
            const data = fs.readFileSync("./db.json");
            console.log(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }

   }


const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json" , JSON.stringify(data));
} catch (error) {
    console.log(error);
}
};

app.get("/",(req, res) => { 
    res.send("Wellcome to my first API with nodejs!!!!!!!!!!");
});

app.get("/books", (req, res) => {
    const data  = readData();
    res.json(data.books);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');

});