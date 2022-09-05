
import 'source-map-support/register';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { ItemsResolver } from './src/resolvers/Items';

const isDeploy = !!process.env.NODE_ENV_DEPLOY;
const isProd = process.env.NODE_ENV === 'prod';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ItemsResolver],
    emitSchemaFile: !isDeploy,
  });

  return new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
}

exports.handler = async (event: any, ctx: any, callback: any) => {
  return bootstrap()
    .then(server => server.createHandler({ expressGetMiddlewareOptions: {
      cors: {
        // TODO: fix prod origin
        origin: isProd ? '*' : '*',
        credentials: true,
      }
    }}))
    .then(handler => handler(event, ctx, callback))
};

