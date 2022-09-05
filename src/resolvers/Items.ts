import { Resolver, Arg, Query, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server-lambda';
import { GetItemsArgs, Items } from '../entities/Items';
import dummy from '../dummy';

@Resolver()
export class ItemsResolver {
  @Query((_returns) => Items, { nullable: false })
  item(@Arg('id') id: string) {
    const item = dummy.find((i) => i.id === id);
    if (item === undefined) {
      throw new UserInputError(`Item with id ${id} not found`);
    }
    return item;
  }

  @Query(() => [Items])
  items(@Args() { range }: GetItemsArgs ) {
    const diff = new Date().getTime() - range * 24 * 60 * 60 * 1000;
    const items = dummy.filter((val) => val.publishDate.getTime() >= diff);
    return items;
  }
}
