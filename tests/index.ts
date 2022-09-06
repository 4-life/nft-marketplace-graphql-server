import request from 'supertest';
import { expect } from 'chai';

type graphqlRes = request.Response & {errors: any};

const URL = 'https://0lqd6iq4ba.execute-api.eu-central-1.amazonaws.com/dev';

const statusData = {
  query: `query GetStatus {
    status
  }`
};

const queryData = {
  query: `query ($range: Int) {
    items(range: $range) {
      id
    }
  }`,
  variables: { range: 365 },
};

describe('Main tests', () => {
  it('should return server status', async () => {
    const response = await request(URL).post('/').send(statusData) as graphqlRes;
    expect(response.ok).to.be.true;
    expect(response.body.data?.status).to.be.true;
  }).timeout(5000); // increase timeout on first run to awake lambda

  it('should return items', async () => {
    const response = await request(URL).post('/').send(queryData) as graphqlRes;
    expect(response.ok).to.be.true;
    expect(response.errors).to.be.undefined;
    expect(response.body?.data?.items).to.not.be.undefined;
  });
});
