import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/app-error";
import { compare } from "bcrypt";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().trim().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return response.status(201).json({ message: "ok" });
  }
}

export { SessionsController };
