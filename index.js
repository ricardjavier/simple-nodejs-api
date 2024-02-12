import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
   
    try {
const data = fs.readFileSync("./db.json");
return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return { book: []} ;
}
};
  const writeData =(data) => {
    try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
        return JSON.parse(data);
            } catch (error) {
                console.log(error);
        }
  };

app.get("/",(req, res) => { 
    res.send("Wellcome to my first API with nodejs!!!");

});

app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    if (book){
        res.json(book);
    } else {
        res.status(405).json({error: "book not found" });
    }
    
});

app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;      
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
   data.books.push(newBook); 
   writeData(data);
   res.json(newBook);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');

});
