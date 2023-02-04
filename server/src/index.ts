import express from "express";
import cors from "cors";
import superjson from "superjson";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC } from "@trpc/server";
import { createContext} from "./utils/trpc";
import { sneakerRouter } from "../routers/sneaker";
import { userRouter } from "../routers/user"
import cookieParser from 'cookie-parser'
export const app = express();

app.use(cors({
  origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
  ],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

 const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const appRouter = t.router({
  sneaker: sneakerRouter,
  user: userRouter,
  
  
});

export type AppRouter = typeof appRouter;
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
