import request from '@/utils/request';
export const getSearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  });
};

export const getSearchResults = (page, perPage, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: perPage
    }
  });
};
