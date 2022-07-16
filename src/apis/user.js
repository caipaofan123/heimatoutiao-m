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

export { login, sendCode, getUserInfo };
// 不能这样写
