
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import redis from "../lib/cache";

const prisma = new PrismaClient();

class UserController {
    static async find(req: Request, res: Response){
        try {
            console.time("find users");            

            const cacheKey = "users:all";
            const cachedUsers = await redis.get(cacheKey);
            if (cachedUsers){
                console.timeEnd("find users");
                return res.json(JSON.parse(cachedUsers));
            }

            const users = await prisma.user.findMany();
            console.timeEnd("find users");

            await redis.set(cacheKey, JSON.stringify(users), "EX", 10);
            return res.json(users);
        } catch (e) {
            console.log(e);
            return res.json({
                error: e
            });
        }
    }
}

export default UserController;