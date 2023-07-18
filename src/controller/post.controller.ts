import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    });
    if (posts.length < 1)
      return res.status(404).json({ message: "There is no published Post" });

    return res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post)
      return res.status(404).json({ message: `There is no Post with ${id}` });

    return res.json(post);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const addPost = async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body;

  if (!title || !content || authorEmail)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const updatePostPublished = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
    });
    if (!post)
      return res.status(404).json({ message: `There is no Post with ${id}` });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    if (!post)
      return res.status(404).json({ message: `There is no Post with ${id}` });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
