import request from '@/utils/request';

export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  });
};

export const getDetail = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  });
};

export const getComments = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: type,
      source
    }
  });
};

// export const getComments2 = (source) => {
//   return request({
//     url: '/v1_0/comments',
//     params: {
//       type: 'c',
//       source
//     }
//   });
// };

export const setComments = (id, content, artid) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id,
      content,
      art_id: artid
    }
  });
};
