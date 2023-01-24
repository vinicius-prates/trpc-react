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

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Funfou nessa pomba" });
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

app.listen(4000, () => {
  console.log("listening on port 4000");
});
