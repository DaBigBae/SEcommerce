import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ProductCategory from '../productCategories/productCategory.entity';
import { CarProperties } from './types/carProperties.interface';
import { BookProperties } from './types/bookProperties.interface';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @ManyToOne(
    () => ProductCategory,
    (category: ProductCategory) => category.products,
  )
  public category: ProductCategory;

  @Column({
    type: 'jsonb',
  })
  public properties: CarProperties | BookProperties;

  @Column()
  public brand: string;

  @Column()
  public currency: string;

  @Column()
  public sku: string;

  @Column()
  public price: string;

  @Column()
  public vote: number;

  @Column()
  public description: string;
}

export default Product;
