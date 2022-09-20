import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

export const castHits = <Type>(hit: SearchHit<Type>): Type => {
  return Object.assign({ id: hit._id }, hit._source);
};
