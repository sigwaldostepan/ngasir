import { Stock } from 'src/features/stock/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionDetail } from '../transaction/entities/transaction-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Stock, (stock) => stock.product, {
    eager: true,
    cascade: ['remove'],
  })
  stock: Stock;

  @OneToMany(
    () => TransactionDetail,
    (transactionDetail) => transactionDetail.product,
    {
      cascade: ['remove'],
    },
  )
  transactionDetail: TransactionDetail;
}
