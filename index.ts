import express from "express";
import cors from "cors";
import { z } from "zod";
import { prisma } from "./utils/prisma";
import superjson from "superjson"
import { isAuthenticated, isAuthenticatedRequest } from "./utils/middleware";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC, TRPCError } from "@trpc/server";
const app = express();

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
})

export type AppRouter = typeof appRouter 
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    }),    
);


app.get("/", (req, res) => {
  return res.status(200).json({ message: "Home page" });
});

const sneakerScheme = z.object({
    sneakername: z.string().max(50),
    retailprice: z.number(),
    description: z.string().max(500),
    releasedAt: z.string(),
  });
  

app.post("/sneaker", async (req, res) => {
  try {
    const newSneaker = sneakerScheme.parse(req.body);
    const sneaker = await prisma.sneaker.create({
      data: newSneaker,
    });

    return res.status(200).json({message:"Sneaker added", sneaker });
  } catch (error) {
    return res.status(400).json({ message: "Bad request error", error });
  }
});

app.get("/sneakers", async (req, res) => {
    const allSneakers = await prisma.sneaker.findMany({})
    return res.status(200).json({ sneakers: allSneakers })
})

const UserScheme = z.object({
    email: z.string().email(),
    username: z.string().max(100),
    age: z.number().min(15),
    password: z.string().max(50).min(8),
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


const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
});


app.post("/user/session", async (req, res) => {
    
    const { email, password } = loginScheme.parse(req.body);
    const user = await prisma.user.findFirst({
        where:{
            email,
        }
    });

    if(!user) return res.status(404).json({ message: "Error 404, user not found."});

    const correctPassword = password === user.password;

    if(!correctPassword) return res.status(401).json({ message: "Invalid password"});

    const newSession = await prisma.session.create( {
        data:{
                userId: user.id
        }
    });

    const newSessionId = newSession.sessionId;

    return res.status(200).json({ message: "You now is logged in.", newSessionId})

    
} )

app.delete("/user/session", async (req, res) => {
    
    const { sessionId } = z.object({
        sessionId: z.string(),
    }).parse(req.body);

    try{
        await prisma.session.delete({
            where: {
                sessionId,
            },
        });

        return res.status(200).json({ message: "You logged out!"})
    } catch (error){
        return res.status(500).json({ message: "ah, shit! something went wrong."})
    }
})

const addFavoriteSneakerScheme = z.object({
    sneakerId: z.string(),
});


app.post("/user/favorite/sneaker", isAuthenticated, async (req: isAuthenticatedRequest, res) => {
    const { sneakerId } = addFavoriteSneakerScheme.parse(req.body);

    try{
        const user= await prisma.user.update({
            where: {
                id: req.user?.id,
            }, 
            data: {
                favoriteSneakers: {
                    connect: {
                        id: sneakerId
                    },
                },
            },
        });

        return res.status(200).json({ message: "Sneaker added to list of favorites. ", user})
    } catch (error){
        return res.status(400).json({ message: "something went wrong..."});
    }

})

app.post(
    "/user/me",
    isAuthenticated,
    async (req: isAuthenticatedRequest, res) => {
      return res.status(200).json({ user: req.user });
    }
  );
  
app.listen(4000, () => {
  console.log("listening on port 4000");
});
