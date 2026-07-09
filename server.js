import express from "express"
import 'dotenv/config'
import singleRouter  from "./routes/singleRoutes.js"

const port = process.env.PORT
const dbPath = process.env.DB_PATH
const startingBalance = process.env.STARTING_BALANCE

const app = express()

app.use(express.json())

app.use("/cart", () => console.log())

app.use("/order", () => console.log())

app.use("/", singleRouter)

app.listen(port, () => console.log("server is up..."))

