<template>
  <div>
    <van-row class="commentlist">
      <van-col span="12" @click="clickFn"
        ><van-button round size="small" class="van-btn"
          >写评论</van-button
        ></van-col
      >
      <van-col span="3"><van-icon class="van-icon" name="comment-o" /></van-col>
      <van-col span="3"
        ><van-icon
          class="van-icon"
          name="star-o"
          v-if="!isstar"
          @click="collection(artid)"
        />
        <van-icon
          class="van-icon"
          name="star"
          v-else
          @click="nocollection(artid)"
        />
      </van-col>
      <van-col span="3"
        ><van-icon
          class="van-icon"
          name="good-job-o"
          v-if="!islike"
          @click="good(artid)"
        />
        <van-icon
          class="van-icon"
          name="good-job"
          v-else
          @click="nogood(artid)"
        />
      </van-col>
      <van-col span="3"><van-icon class="van-icon" name="share-o" /></van-col>
    </van-row>
  </div>
</template>

<script>
import { like, nolike, collection, nocollection } from '@/apis';
export default {
  name: 'HeimaMCommentLine',

  data() {
    return {
      artid: this.$store.state.id,
      islike: false,
      isstar: false
    };
  },

  mounted() {},

  methods: {
    clickFn() {
      this.$emit('clickFn');
    },
    async good(artid) {
      const res = await like(artid);
      console.log(res);
      if (res.data.data.target) {
        this.islike = true;
      }
    },
    async nogood(artid) {
      const res = await nolike(artid);
      console.log(res);
      if (!res.data) {
        this.islike = false;
      }
    },
    async collection(artid) {
      console.log(111);
      const res = await collection(artid);
      console.log(res);
      if (res.data.data.target) {
        this.isstar = true;
      }
    },
    async nocollection(artid) {
      const res = await nocollection(artid);
      console.log(res);
      if (!res.data) {
        this.isstar = false;
      }
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
  width: 750px;
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
