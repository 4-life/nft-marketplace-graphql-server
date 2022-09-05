import { Max, Min } from 'class-validator';
import { ObjectType, Field, ID, Int, ArgsType } from 'type-graphql';
import { Authors } from './Authors';

@ObjectType({ description: 'The Items model' })
export class Items {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  pic?: string;

  @Field()
  author: Authors;

  @Field()
  views: number;

  @Field()
  title: string;

  @Field()
  price: string;

  @Field(type => Int)
  @Min(0)
  likes: number = 0;

  @Field()
  @Min(0)
  comments: number = 0;

  @Field()
  publishDate: Date;
}

@ArgsType()
export class GetItemsArgs {
  @Field(type => Int, { defaultValue: 365 })
  @Min(1)
  @Max(3650)
  range: number;
}

export const ItemsModel = Items;
