import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The Authors model' })
export class Authors {
  @Field(() => ID)
  id: string;

  @Field()
  name: String;

  @Field({ nullable: true })
  avatar?: String;
}

export const AuthorsModel = Authors;
