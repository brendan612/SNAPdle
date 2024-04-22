import { MONGODB_URL, NODE_ENV } from 'server/src/env';

export const mongooseConfig = {
  url: MONGODB_URL + (NODE_ENV === 'test' ? '-test' : ''),
};
