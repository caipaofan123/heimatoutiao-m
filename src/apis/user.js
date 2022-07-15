import request from '@/utils/request';

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
export { login, sendCode };
// 不能这样写
