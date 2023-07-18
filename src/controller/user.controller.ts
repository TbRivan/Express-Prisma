import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(404).json({ message: "No Users Found" });

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: "Missing Required value" });

  try {
    const result = await prisma.user.create({
      data: { ...req.body },
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
