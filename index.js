import express, { json } from 'express';
import fs from 'fs';
import bodyParser from "body-parser";
import { execFileSync } from 'child_process';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json());

const readData = () => {

    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return {};
    }
};
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }

};

app.get("/", (req, res) => {
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
    res.json(book);
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

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
        data.books[bookIndex] = {
            ...data.books[bookIndex],
            ...body,
        };
        writeData(data);
        res.json({ message: "Book updated successfully" });
    } else {
        res.status(407).json({ error: "Book not found" });

    }

});

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });



});


app.listen(3000, () => {
    console.log('Server listening on port 3000');

});
