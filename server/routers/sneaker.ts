import { z } from "zod";
import { prisma } from  "../src/utils/prisma"
import { initTRPC, TRPCError } from "@trpc/server";
import {  sneakerScheme } from "../schemas/zod-schemes";
import superjson from "superjson";
import { router } from "../src/utils/trpc";
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const sneakerRouter = router({
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
})
