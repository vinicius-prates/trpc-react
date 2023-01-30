import express from "express";
import cors from "cors";
import { z } from "zod";
import { prisma } from "./utils/prisma";
import superjson from "superjson";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC, TRPCError } from "@trpc/server";
import { loginScheme, sneakerScheme, UserScheme } from "./server/zod-schemes";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext, privateProcedure, publicProcedure } from "./utils/trpc";
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
  allSneaker: t.procedure.query(async () => {
    try {
      const allSneakers = await prisma.sneaker.findMany();
      return { allSneakers };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "KKKKKKK deu merda",
      });
    }
  }),

  addSneaker: t.procedure.input(sneakerScheme).mutation(async ({ input }) => {
    await prisma.sneaker.create({
      data: {
        sneakername: input.sneakername,
        description: input.description,
        retailprice: input.retailprice,
        releasedAt: input.releasedAt,
      },
    });
  }),

  deleteSneaker: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        await prisma.sneaker.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "FORBIDDEN",
          cause: error,
          message: "Could not delete this sneaker",
        });
      }
    }),

  createUser: t.procedure.input(UserScheme).mutation(async ({ input }) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: input.username,
          email: input.email,
          age: input.age,
          password: input.password,
        },
      });
      return { newUser };
    } catch (error) {
      throw new TRPCError({
        code: "FORBIDDEN",
        cause: error,
        message: "Could not delete this sneaker",
      });
    }
  }),

  login: publicProcedure.input(loginScheme).mutation(async ({ ctx, input  }) => {
    if(ctx.session && ctx.session.user){
      console.log("session on login", ctx.session)
      throw new TRPCError({
        code:"UNAUTHORIZED",
        message: "You are already logged in."
      })

    }
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    const validPassword = user.password === input.password;

    if (!validPassword)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Wrong password",
      });

    const login = await prisma.session.create({
      data: {
        userId: user.id,
      },
    });
    const newSessionId = login.sessionId;
  
    ctx.setSessionCookie(newSessionId)
    return (user)
    
  }),

  logout: privateProcedure.mutation(async ({ctx}) => {
    const session = await ctx.prisma.session.delete({
      where: {
        sessionId: ctx.session?.sessionId
      },

    });
    ctx.deleteSessionCookie(session.sessionId)
    return { message: "Logout done"}
  })
  
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
