export class CreateLoanDto {
  bookId: number;
  borrowerId: number;
  dueAt?: Date;
}