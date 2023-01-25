import express from "express";
import cors from "cors";
import { z } from "zod";
import { prisma } from "./utils/prisma";
import superjson from "superjson"
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC, TRPCError } from "@trpc/server";
import { sneakerScheme } from "./zod-schemes";

export const app = express();

app.use(cors());
app.use(express.json());

const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
})

const appRouter = t.router({
    allSneaker: t.procedure.query(async () => {
        try {   
            const allSneakers = await prisma.sneaker.findMany()
            return { allSneakers }
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
                message:"KKKKKKK deu merda"
            })
        }
    }),

    addSneaker: t.procedure.input(sneakerScheme)
    .mutation( async () => {
        
    })
})

export type AppRouter = typeof appRouter 
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    }),    
);


