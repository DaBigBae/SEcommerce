import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import Product from './product.entity';
import CreateProductDto from './dto/createProduct.dto';
import ProductNotFoundException from './exceptions/productNotFound.exception';

@Injectable()
export default class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getProducts(
    offset?: number,
    limit?: number,
    startId?: number,
    options?: FindManyOptions<Product>,
  ){
    const where: FindManyOptions<Product>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.productsRepository.count();
    }

    const [items, count] = await this.productsRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });

    return {
      items,
      count: startId ? separateCount : count,
    };
  }

  async getProductsByBrand(offset?: number, limit?: number, startId?: number) {
    return this.getProducts(offset, limit, startId, {
      relations: {
        brand: true,
      }
    })
  }

  async getProductsById(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if(product){
      return product;
    }
    this.logger.warn('Tried to access a product that does not exist');
    throw new ProductNotFoundException(id);
  }
  
  getAllProducts() {
    return this.productsRepository.find();
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);
    return newProduct;
  }
}
