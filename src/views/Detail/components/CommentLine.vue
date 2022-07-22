<template>
  <div>
    <van-row class="commentlist">
      <van-col span="12" @click="clickFn"
        ><van-button round size="small" class="van-btn"
          >写评论</van-button
        ></van-col
      >
      <van-col span="3"><van-icon class="van-icon" name="comment-o" /></van-col>
      <van-col span="3"><van-icon class="van-icon" name="star-o" /></van-col>
      <van-col span="3"
        ><van-icon class="van-icon" name="good-job-o"
      /></van-col>
      <van-col span="3"><van-icon class="van-icon" name="share-o" /></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HeimaMCommentLine',

  data() {
    return {};
  },

  mounted() {},

  methods: {
    clickFn() {
      this.$emit('clickFn');
    }
  }
};
</script>

<style lang="less" scoped>
// .container{
//     position: fixed;
//     left: 0;
//     bottom: 0;
//     width: 100%;
//     background: hotpink;
// }
.commentlist {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: hotpink;
  text-align: center;
  :deep(.van-icon) {
    margin-top: 18px;
  }
  .van-btn {
    width: 300px;
    margin-bottom: 15px;
  }
}
</style>
