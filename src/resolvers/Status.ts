import { Resolver, Query } from 'type-graphql';

@Resolver()
export class StatusResolver {
  @Query(() => Boolean)
  status() {
    return true;
  }
}
