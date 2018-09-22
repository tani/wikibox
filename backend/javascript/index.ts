import express from "express";
import crypto from "crypto";
const { readFile, writeFile } = require("fs/promises");

const tokenDB = {};

const userDB = {};

const app = express();

app.use(express.static("lib"));

app.get("/data/:filename", async (req, res)=>{
    res.send(await readFile(req.params.filename));
});

app.post("/data/:filename", async (req, res)=>{
    if(true) {
        await writeFile(req.params.filename, req.params.content);
        res.send(await readFile(req.params.filename));
    }
});

app.post("/token", async (req, res)=>{
});
