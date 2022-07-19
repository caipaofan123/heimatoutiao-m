<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form class="form" @submit="login" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #right-icon>
          <van-count-down
            :time="time"
            v-if="isShow"
            format="ss s"
            @finish="isShow = false"
          />
          <van-button v-else class="code-btn" round size="mini" @click="clickFn"
            >获取验证码</van-button
          >
        </template>
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- <h1>{{ $store.state.number }}</h1>
    <button @click="increment">点击+1</button> -->
  </div>
</template>

<script>
import { mobileRules, codeRules } from './Rules';
import { login, sendCode } from '@/apis/user';

export default {
  name: 'login',

  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      time: 60 * 1000,
      isShow: false
    };
  },

  mounted() {},

  methods: {
    // increment() {
    //   this.$store.commit('setNumber', 1);
    // },
    async clickFn() {
      try {
        await this.$refs.form.validate('mobile');
        await sendCode(this.mobile);
        this.isShow = true;
      } catch (error) {
        this.$toast.fail('手机号很非法！');
        if (!error.response) {
          this.$toast.fail('手机号格式不正确！');
        } else {
          const status = error.response.status;
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message);
          }
        }
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    // onSubmit(values) {
    //   console.log('submit', values);
    // },
    async login() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      });
      try {
        const res = await login(this.mobile, this.code);
        this.$store.commit('setUser', res.data.data); 
        // console.log(res);
        // console.log(res.data);
        this.$router.push('/profile');
        this.$toast.success('登录成功');
      } catch (error) {
        // console.log(error);
        const status = error.response.status;
        let message = '登录失败，请刷新重试';
        if (status === 400) {
          message = error.response.data.message;
        }
        this.$toast.fail(message);
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message);

        //     break;
        //   case 507:
        //     this.$toast.fail('登录失败，请刷新重试');

        //     break;

        //   default:
        //     this.$toast.fail('登录失败，请刷新重试');

        //     break;
        // }
        // this.$toast.fail('登录失败');
      }
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
