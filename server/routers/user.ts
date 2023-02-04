import { prisma } from  "../src/utils/prisma"
import { initTRPC, TRPCError } from "@trpc/server";
import { loginScheme,UserScheme } from "../schemas/zod-schemes";
import superjson from "superjson";
import {  privateProcedure, publicProcedure,router } from "../src/utils/trpc";
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const userRouter = router({
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
      }),
    
      me: privateProcedure.query(async ({ctx}) => {
        console.log(ctx.session?.sessionId)
        return {
          user:ctx.user
        }
      }),
})