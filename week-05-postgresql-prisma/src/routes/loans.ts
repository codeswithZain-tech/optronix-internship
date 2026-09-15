import { Router, Request, Response } from 'express';
import prisma, { queryCount, resetQueryCount } from '../db';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    if (!bookId || !memberId || !dueDate) {
      return res.status(400).json({
        error: "bookId, memberId, and dueDate are required"
      });
    }

    const loan = await prisma.$transaction(async (tx) => {

      const book = await tx.book.findUnique({
        where: { id: Number(bookId) }
      });

      if (!book) {
        throw Object.assign(new Error("Book not found"), { status: 404 });
      }

      if (book.availableCopies < 1) {
        throw Object.assign(
          new Error(`No available copies for "${book.title}"`),
          { status: 409 }
        );
      }

      const member = await tx.member.findUnique({
        where: { id: Number(memberId) }
      });

      if (!member) {
        throw Object.assign(new Error("Member not found"), { status: 404 });
      }

      await tx.book.update({
        where: { id: Number(bookId) },
        data: { availableCopies: { decrement: 1 } }
      });

      const newLoan = await tx.loan.create({
        data: {
          bookId: Number(bookId),
          memberId: Number(memberId),
          dueDate: new Date(dueDate)
        },
        include: {
          book: { select: { id: true, title: true, author: true } },
          member: { select: { id: true, name: true, email: true } }
        }
      });

      return newLoan;
    });

    res.status(201).json(loan);

  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Failed to create loan" });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    resetQueryCount();

    const [total, loans] = await Promise.all([
      prisma.loan.count(),
      prisma.loan.findMany({
        skip,
        take: limit,
        include: {
          book: {
            select: { id: true, title: true, author: true, genre: true }
          },
          member: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    console.log(`GET /loans - Query count: ${queryCount}`);

    res.json({
      data: loans,
      queryCount,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

router.get('/overdue', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [total, overdueLoans] = await Promise.all([
      prisma.loan.count({
        where: {
          dueDate: { lt: new Date() },
          returnedAt: null
        }
      }),
      prisma.loan.findMany({
        where: {
          dueDate: { lt: new Date() },
          returnedAt: null
        },
        skip,
        take: limit,
        include: {
          book: { select: { id: true, title: true, author: true, genre: true } },
          member: { select: { id: true, name: true, email: true } }
        },
        orderBy: { dueDate: 'asc' }
      })
    ]);

    res.json({
      data: overdueLoans,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch overdue loans" });
  }
});

router.patch('/:id/return', async (req: Request, res: Response) => {
  try {
    const loanId = Number(req.params.id);

    const loan = await prisma.loan.findUnique({ where: { id: loanId } });

    if (!loan) return res.status(404).json({ error: "Loan not found" });
    if (loan.returnedAt) return res.status(400).json({ error: "Book already returned" });

    const returned = await prisma.$transaction(async (tx) => {
      const updatedLoan = await tx.loan.update({
        where: { id: loanId },
        data: { returnedAt: new Date() },
        include: {
          book: { select: { id: true, title: true } },
          member: { select: { id: true, name: true } }
        }
      });

      await tx.book.update({
        where: { id: loan.bookId },
        data: { availableCopies: { increment: 1 } }
      });

      return updatedLoan;
    });

    res.json(returned);

  } catch (error) {
    res.status(500).json({ error: "Failed to return book" });
  }
});

export default router;