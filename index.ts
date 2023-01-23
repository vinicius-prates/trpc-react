import express from "express"
import cors from "cors"
import { z } from "zod"

const app = express()

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
 return res.status(200).json({message: "Funfou nessa pomba"})
})

app.listen(4000, () => {
    console.log("listening on port 4000")
})