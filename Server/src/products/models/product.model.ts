import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from "../../productCategories/models/productCategory.model";

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  brand: string;

  @Field()
  currency: number;

  @Field()
  sku: string;

  @Field()
  thumbnail: string;
  
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => Int)
  vote: number;

  @Field(() => [String])
  img: string[];

  @Field({nullable: true})
  category: ProductCategory;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;
}