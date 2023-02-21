import {
    Args,
    Context,
    Info,
    Mutation,
    Query,
    Resolver,
    Subscription,
  } from '@nestjs/graphql';
  import { ProductCategory } from './models/productCategory.model';
  import ProductCategoriesService from './productCategories.service';
//   import { CreatePostInput } from './inputs/post.input';
  import { Inject, UseGuards } from '@nestjs/common';
  import RequestWithUser from '../authentication/requestWithUser.interface';
  import { GraphqlJwtAuthGuard } from '../authentication/graphql-jwt-auth.guard';
  import {
    parseResolveInfo,
    ResolveTree,
    simplifyParsedResolveInfoFragmentWithType,
  } from 'graphql-parse-resolve-info';
  import { GraphQLResolveInfo } from 'graphql';
  import { RedisPubSub } from 'graphql-redis-subscriptions';
  import { PUB_SUB } from '../pubSub/pubSub.module';
//   import { Product } from '../products/models/product.model';
  
//   const POST_ADDED_EVENT = 'postAdded';
  
  @Resolver(() => ProductCategory)
  export class ProductCategoriesResolver {
    constructor(
      private productCategoriesService: ProductCategoriesService,
    //   @Inject(PUB_SUB) private pubSub: RedisPubSub,
    ) {}
  
    @Query(() => [ProductCategory])
    async posts(@Info() info: GraphQLResolveInfo) {
        return await this.productCategoriesService.getAllProductCategories()
        // const parsedInfo = parseResolveInfo(info) as ResolveTree;
        // const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
        //     parsedInfo,
        //     info.returnType,
        // );
  
        // const posts =
        // 'author' in simplifiedInfo.fields
        //   ? await this.postsService.getPostsWithAuthors()
        //   : await this.postsService.getPosts();
    
        // return posts.items;
    }
  
    // @Subscription(() => Post)
    // postAdded() {
    //   return this.pubSub.asyncIterator(POST_ADDED_EVENT);
    // }
  
    // @Mutation(() => Post)
    // @UseGuards(GraphqlJwtAuthGuard)
    // async createPost(
    //   @Args('input') createPostInput: CreatePostInput,
    //   @Context() context: { req: RequestWithUser },
    // ) {
    //   const newPost = await this.postsService.createPost(
    //     createPostInput,
    //     context.req.user,
    //   );
    //   this.pubSub.publish(POST_ADDED_EVENT, { postAdded: newPost });
    //   return newPost;
    // }
  }