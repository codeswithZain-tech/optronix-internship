import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [total, members] = await Promise.all([
      prisma.member.count(),
      prisma.member.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          _count: { select: { loans: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    res.json({
      data: members,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

router.get('/:id/stats', async (req: Request, res: Response) => {
  try {
    const memberId = Number(req.params.id);

    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) return res.status(404).json({ error: "Member not found" });

    const loans = await prisma.loan.findMany({
      where: { memberId },
      include: {
        book: { select: { genre: true } }
      }
    });

    const totalLoans = loans.length;

    const returnedLoans = loans.filter(l => l.returnedAt !== null);
    const avgDaysHeld =
      returnedLoans.length > 0
        ? returnedLoans.reduce((sum, l) => {
            const days = Math.floor(
              (new Date(l.returnedAt!).getTime() - new Date(l.createdAt).getTime())
              / (1000 * 60 * 60 * 24)
            );
            return sum + days;
          }, 0) / returnedLoans.length
        : 0;

    const genreCount: Record<string, number> = {};
    loans.forEach(l => {
      const genre = l.book.genre || 'Unknown';
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const favouriteGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    res.json({
      member: { id: member.id, name: member.name, email: member.email },
      stats: {
        totalLoans,
        avgDaysHeld: Math.round(avgDaysHeld * 10) / 10,
        favouriteGenre,
        genreBreakdown: genreCount
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch member stats" });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const member = await prisma.member.create({
      data: { name, email, phone: phone || null }
    });

    res.status(201).json(member);

  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Failed to create member" });
  }
});

export default router;