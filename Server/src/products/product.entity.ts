import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import ProductCategory from '../productCategories/productCategories.entity';
// import { CarProperties } from './types/carProperties.interface';
// import { BookProperties } from './types/bookProperties.interface';

@Entity()
class Product {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public title: string;

  @ManyToOne(
    () => ProductCategory,
    (category: ProductCategory) => category.products,
  )
  public category: ProductCategory;

  @Column({type: "text", array: true, nullable: true})
  public img: string[];

  @Column() 
  public thumbnail: string;

  @Column()
  public brand: string;

  @Column()
  public currency: number;

  @Column()
  public sku: string;

  @Column()
  public price: number;

  @Column()
  public vote: number;

  @Column()
  public description: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default Product;
