import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) { }

  async borrowBook(data: CreateLoanDto) {
    const book = await this.prisma.book.findUnique({ where: { id: data.bookId } });

    if (!book) throw new BadRequestException('Livro não encontrado');
    if (!book.available) throw new BadRequestException('Livro não disponível');

    const dueAt = data.dueAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const loan = await this.prisma.loan.create({
      data: {
        bookId: data.bookId,
        borrowerId: data.borrowerId,
        dueAt,
      },
    });

    await this.prisma.book.update({
      where: { id: data.bookId },
      data: { available: false },
    });

    return loan;
  }

  async returnBook(loanId: number) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan) throw new BadRequestException('Empréstimo não encontrado');
    if (loan.returnedAt) throw new BadRequestException('Livro já devolvido');

    // Atualiza a devolução
    const updatedLoan = await this.prisma.loan.update({
      where: { id: loanId },
      data: { returnedAt: new Date() },
    });

    // Marca o livro como disponível novamente
    await this.prisma.book.update({
      where: { id: loan.bookId },
      data: { available: true },
    });

    return updatedLoan;
  }
}
