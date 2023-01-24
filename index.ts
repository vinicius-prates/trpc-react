import express from "express";
import cors from "cors";
import { z } from "zod";
import { prisma } from "./utils/prisma";
const app = express();

app.use(cors());
app.use(express.json());

const sneakerScheme = z.object({
  sneakername: z.string().max(50),
  retailprice: z.number(),
  description: z.string().max(500),
  releasedAt: z.string(),
});

const UserScheme = z.object({
    email: z.string(),
    username: z.string().max(100),
    age: z.number().min(15),
    password: z.string().max(50).min(8),
})

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Home page" });
});

app.post("/sneaker", async (req, res) => {
  try {
    const newSneaker = sneakerScheme.parse(req.body);
    const sneakers = await prisma.sneaker.create({
      data: newSneaker,
    });

    return res.status(200).json({ sneakers });
  } catch (error) {
    return res.status(400).json({ message: "Bad request error", error });
  }
});

app.get("/sneakers", async (req, res) => {
    const allSneakers = await prisma.sneaker.findMany({})
    return res.status(200).json({ sneakers: allSneakers })
})

app.post("/create-user", async (req, res) => {

    try{

        const newUser = UserScheme.parse(req.body);
        const createdUser = await prisma.user.create({ data:newUser });
        
        return res.status(200).json({ user: createdUser})
    } catch (error) {
        return res.status(400).json({ message: "Bad request, couldn't create a user", error})
    }
})

app.listen(4000, () => {
  console.log("listening on port 4000");
});
