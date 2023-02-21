import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsResolver } from './products.resolver';
import Product from './product.entity';
import ProductsController from './products.controller';
import ProductsService from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
