import { InputType, Field } from '@nestjs/graphql';
import ProductCategory from 'src/productCategories/productCategories.entity';
import { ManyToOne, OneToMany } from 'typeorm';


@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  // @Field()
  // @ManyToOne((_type) => ProductCategory, (pCate: ProductCategory) => pCate.id)
  // category: any;

  @Field()
  currency: number;

  @Field()
  price: number;

  @Field()
  brand?: string;
}