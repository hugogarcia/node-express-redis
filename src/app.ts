import express from "express";
import UserController from "./controllers/UserController";
import redis from "./lib/cache";

const app = express();

app.get('/', (req, res) => res.send("I'm fine"));

app.get('/user', UserController.find);

app.get('/clear-cache', async (req, res) => {
    await redis.del("users:all");
    res.json({status: "OK"});
});

console.log('Running on port 3000!');
app.listen(3000);