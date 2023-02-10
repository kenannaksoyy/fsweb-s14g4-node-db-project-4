const express = require("express");
const server = express();
const tariflerRouter = require("./tarifler/tarifler-router");

server.use(express.json());
server.use("/api/tarifler", tariflerRouter);
server.get("/",(req,res) =>{
    res.status(200).json({
        message:"Server Get Deneme"
    })
});

server.use("*", (req,res) => {
    res.status(404).json({
        message:"Opps Sayfa Yok"
    })
});

module.exports = server;