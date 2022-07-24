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

export const like = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id
    }
  });
};

export const nolike = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE',
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

export const collection = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id
    }
  });
};

export const nocollection = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE',
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

export const likecom = (id) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id
    }
  });
};
export const nolikecom = (id) => {
  return request({
    url: `/v1_0/comment/likings/${id}`,
    method: 'DELETE',
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
