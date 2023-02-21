import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategory from './productCategories.entity';
import { ProductCategoriesResolver } from './productCategories.resolver';
import ProductCategoriesController from './productCategories.controller';
import ProductCategoriesService from './productCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService, ProductCategoriesResolver],
})
export class ProductCategoriesModule {}
