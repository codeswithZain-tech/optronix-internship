import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.member.deleteMany();
  await prisma.library.deleteMany();

  const library = await prisma.library.create({
    data: { name: "City Central Library", address: "123 Main Street" }
  });

  await prisma.book.createMany({
    data: [
      { title: "1984", author: "George Orwell", genre: "Dystopian", totalCopies: 5, availableCopies: 5, libraryId: library.id },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", totalCopies: 3, availableCopies: 3, libraryId: library.id },
      { title: "Sapiens", author: "Yuval Harari", genre: "Non-Fiction", totalCopies: 4, availableCopies: 4, libraryId: library.id },
      { title: "Harry Potter 1", author: "J.K. Rowling", genre: "Fantasy", totalCopies: 6, availableCopies: 6, libraryId: library.id },
      { title: "Murder on the Orient Express", author: "Agatha Christie", genre: "Mystery", totalCopies: 2, availableCopies: 2, libraryId: library.id }
    ]
  });

  await prisma.member.createMany({
    data: [
      { name: "Ali Khan", email: "ali@library.com", phone: "03001234567" },
      { name: "Sara Ahmed", email: "sara@library.com", phone: "03011234567" },
      { name: "Zain Malik", email: "zain@library.com", phone: "03021234567" }
    ]
  });

  console.log("Seed complete!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());