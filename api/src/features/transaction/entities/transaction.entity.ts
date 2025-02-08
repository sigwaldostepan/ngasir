import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionDetail } from './transaction-detail.entity';
import { Customer } from 'src/features/customer/customer.entity';

export enum TransactionType {
  SALE = 'sale',
  RESTOCK = 'restock',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SALE,
  })
  type: TransactionType;

  @Column('decimal', { name: 'total_price' })
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(
    () => TransactionDetail,
    (transactionDetail) => transactionDetail.transaction,
    { cascade: true },
  )
  details: TransactionDetail[];

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
