import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const genre = req.query.genre as string | undefined;

    const where = genre ? { genre } : {};

    const [total, books] = await Promise.all([
      prisma.book.count({ where }),
      prisma.book.findMany({
        where,
        skip,
        take: limit,
        include: {
          library: { select: { id: true, name: true } }
        },
        orderBy: { title: 'asc' }
      })
    ]);

    res.json({
      data: books,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        library: { select: { id: true, name: true } },
        loans: {
          where: { returnedAt: null },
          include: {
            member: { select: { id: true, name: true } }
          }
        }
      }
    });

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, author, genre, totalCopies, libraryId } = req.body;

    if (!title || !author || !libraryId) {
      return res.status(400).json({ error: "title, author, libraryId required" });
    }

    const copies = Number(totalCopies) || 1;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre: genre || null,
        totalCopies: copies,
        availableCopies: copies,
        libraryId: Number(libraryId)
      }
    });

    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
});

export default router;