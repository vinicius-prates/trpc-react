
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson'
import { initTRPC, TRPCError, inferAsyncReturnType } from '@trpc/server';
import { prisma } from "./prisma"

export const createContext = async ({
    req, res
}: trpcExpress.CreateExpressContextOptions) => {
    const setSessionCookie = (sessionId : string) => {
        res.cookie('sessionId', sessionId, { httpOnly: true})
    }

    const deleteSessionCookie = (sessionId: string ) => {
        res.clearCookie('sessionId')
    }

    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return { prisma, setSessionCookie, deleteSessionCookie};
    }

    const session = await prisma.session.findFirst({
        where: { sessionId},
        include: {
            user: true
        }
    })

    return { prisma, session, setSessionCookie, deleteSessionCookie};
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    }
})

const isAuthenticatedMiddleware = t.middleware(async ({ctx, next}) => {
    if(!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED"})
    }
    return next ({
        ctx: {
            user: ctx.session.user
        }
    });
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticatedMiddleware);