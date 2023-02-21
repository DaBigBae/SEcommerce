import { Inject, UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Parent, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GraphqlJwtAuthGuard } from 'src/authentication/graphql-jwt-auth.guard';
import { PUB_SUB } from 'src/pubSub/pubSub.module';
import { CreateProductInput } from './inputs/product.input';
import { Product } from "./models/product.model";
import ProductsService from './products.service';

const POST_ADDED_EVENT = 'productAdded';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private productsService: ProductsService,
        @Inject(PUB_SUB) private pubSub: RedisPubSub,
    ){}

    @Query(() => [Product])
    async products(@Info() info: GraphQLResolveInfo){
        const parsedInfo = parseResolveInfo(info) as ResolveTree;
        const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
            parsedInfo,
            info.returnType,
        )

        const products = 
            'brand' in simplifiedInfo.fields
                ? await this.productsService.getProductsByBrand()
                : await this.productsService.getProducts()

        return products.items;
    }

    @Subscription(() => Product)
    postAdded() {
        return this.pubSub.asyncIterator(POST_ADDED_EVENT);
    }

    @Mutation(() => Product)
    @UseGuards(GraphqlJwtAuthGuard)
    async createProduct(
        @Args('input') createProductInput: CreateProductInput,
    ) {
        const newProduct = await this.productsService.createProduct(
            createProductInput,
        );
        return newProduct;
    }
}
