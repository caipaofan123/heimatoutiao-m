<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #right-icon>
          <van-button class="code-btn" round size="mini">获取验证码</van-button>
        </template>
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/apis/user';
export default {
  name: 'login',

  data() {
    return {
      mobile: '',
      code: ''
    };
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // onSubmit(values) {
    //   console.log('submit', values);
    // },
    async login() {
      const res = await login(this.mobile, this.code);
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  // 穿透样式覆盖 vue提供的语法
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon:before {
    color: #fff;
  }
}

.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #ededed;
    color: #666666;
  }
}
</style>
