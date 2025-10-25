import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string().trim().min(1),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    await prisma.delivery.create({
      data: { user_id, description },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany();

    return response.status(200).json(deliveries);
  }
}

export { DeliveriesController };
