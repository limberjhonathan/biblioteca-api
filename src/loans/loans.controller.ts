import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Post('borrow')
  @UseGuards(JwtAuthGuard)
  borrowBook(@Body() data: CreateLoanDto) {
    return this.loansService.borrowBook(data);
  }

  @Patch('return/:id')
  @UseGuards(JwtAuthGuard)
  returnBook(@Param('id') id: string) {
    return this.loansService.returnBook(Number(id));
  }
}
