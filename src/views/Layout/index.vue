<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
          <div class="text">首页</div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
          <div class="text">视频</div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
          <div class="text">问答</div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
          <!-- <div class="text">我的</div> -->
          <div class="text">{{!!$store.state.user.token?'我的':'未登录'}}</div>
        </template>
      </van-tabbar-item>
      
      
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  }
};
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon){
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .toutiao{
    font-size: 0.53333rem;
  }
  .text{
    font-size: 0.32rem;
  }
  

}
</style>
