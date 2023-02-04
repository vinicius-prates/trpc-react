import { z } from "zod";
import { prisma } from "./prisma"
import { User } from "@prisma/client"
import { NextFunction, Request, Response } from "express";


export interface isAuthenticatedRequest extends Request {
    user?: User;

}

const isAuthenticatedScheme = z.object({
    sessionId: z.string(),
});

export const isAuthenticated = async (
    req: isAuthenticatedRequest,
    res: Response,
    next: NextFunction,

) => {
    try {
        const { sessionId } = isAuthenticatedScheme.parse(req.body);
        const session = await prisma.session.findUnique({
            where: {
                sessionId,
            },
        });

    if(!session) return res.status(404).json({ message: "You need to loggin first!"})

    const user = await prisma.user.findUnique({
        where: {
            id: session.sessionId,
        },
    });

    if (!user) return res.status(404).json({ message: "User not found!" })
    
    req.user = user;
    next()

    } catch (error) {
        return res.status(400).json({ message: "UNATHORIZED."})
    }
}