import express from "express";
import "dotenv/config";
import singleRouter from "./routes/singleRoutes.js";
import cartRouter  from "./routes/cartRoutes.js";

const port = process.env.PORT;
const dbPath = process.env.DB_PATH;
const startingBalance = process.env.STARTING_BALANCE;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
});

app.use("/cart", cartRouter);

app.use("/order", () => console.log());

app.use("/", singleRouter);

app.listen(port, () => console.log("server is up..."));
