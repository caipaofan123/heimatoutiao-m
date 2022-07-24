import request from '@/utils/request';
// import store from '@/store';

const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  });
};

const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  });
};

const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

export const upPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    Headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
};

export const getUser = () => {
  return request({
    url: '/v1_0/user/profile'
  });
};

export const editUser = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name,
      gender,
      birthday
    }
  });
};

export const followings = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id
    }
  });
};

export const delfollowings = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE',
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      target: id
    }
  });
};

export { login, sendCode, getUserInfo };
// 不能这样写
