import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// const app = express();
app.use(express.json())
app.use(cors());

app.get("api/notes/:id", async(req, res)=>{
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { id, title, content, createdAt } = req.body;
  try {
    const note = await prisma.note.create({
      data: {id,
        title,
        content,
        createdAt
      },
    });
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating a note:", error);
    res.status(500).json({ error: "An error occurred while creating the note." });
  }
});

app.put("api/notes/:Id", async(req, res)=>{
  const { id, title, content, createdAt } =req.body;
  const Id = parseInt(req.params.Id);

  if(!title || !content) {
    return res.status(400).send("title and content required")
  }

  if(!Id || isNaN(Id)) {
    return res.status(400).send("must be unique")
  }
  try {
    const updatedNote = await prisma.note.update({
      where: {id},
      data: {id, title, content, createdAt}
    })
    res.json(updatedNote)
  } catch (error) {
    res.status(500).send("sth went wrong")
  }
});

app.delete("api/notes/:Id", async (req, res) => {
  const Id = parseInt(req.params.Id);
  if(!Id || isNaN(Id)) {
    return res.status(400).send("must be a valid integer")
  }
  try {
    await prisma.note.delete({
      where: {id:Id},
    });
    res.status(400).send("valid integer please");
  } catch (error) {
    res.status(500).send("sth went wrong")
  }
})

app.listen(4000, ()=>{
  console.log("listening on 4000");
});








































// // sample code

// import { createServer } from "http";

// const server = createServer((req, res) => {
//   res.end("Hello, world!");
// });

// server.listen(3000, () => {
//   console.log("listening on 3000");
// });

// // install typescript, ts-node and nodemon to run ts file directly  without compiling on terminal with
// //  npm install -D typescript ts-node nodemon
// // and add script to package.json => "start": "nodemon --exec ts-node src/index.ts" or dev: "nodemon  src/index.ts"


