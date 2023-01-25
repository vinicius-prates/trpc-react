import { z } from "zod";

export const sneakerScheme = z.object({
    sneakername: z.string().max(50),
    retailprice: z.number(),
    description: z.string().max(500),
    releasedAt: z.string(),
  });

export const UserScheme = z.object({
    email: z.string().email(),
    username: z.string().max(100),
    age: z.number().min(15),
    password: z.string().max(50).min(8),
})

export const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
});

export const addFavoriteSneakerScheme = z.object({
    sneakerId: z.string(),
});