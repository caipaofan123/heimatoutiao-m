const mobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机格式不正确a'
  }
];

const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^[0-9]{6}$/, message: '请输入6位数验证码a' }
];

export { mobileRules, codeRules };
