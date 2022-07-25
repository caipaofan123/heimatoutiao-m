<template>
  <div class="container">
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      background="hotpink"
    />
    <h4>{{ artical.title }}</h4>

    <van-row class="row2">
      <van-col span="12">
        <van-row type="flex" align="center" justify="space-around">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="artical.aut_photo"
          />
          <span class="mobile">{{ artical.aut_name }}</span>
        </van-row>
      </van-col>
      <van-col span="11">
        <van-row class="code-row" type="flex" align="center" justify="end">
          <van-button
            class="code-btn"
            round
            size="mini"
            @click="followings(artical.aut_id)"
            v-if="isfollow"
            >关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            size="small"
            @click="delfollowings(artical.aut_id)"
            v-else
            >已关注</van-button
          >
        </van-row>
      </van-col>
    </van-row>

    <article class="content markdown-body">
      <span v-html="artical.content"></span>
    </article>

    <van-divider>正文结束</van-divider>
    <Comment ref="com"></Comment>
    <van-divider>没有更多了</van-divider>
    <Commentline class="commentlist" @clickFn="isshowpop = true"></Commentline>
    <van-popup v-model="isshowpop" position="bottom" :style="{ height: '30%' }">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="text"
        v-model="textvalue"
      ></textarea>
      <van-button class="btn" round size="mini" @click="setComments"
        >发布</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import Comment from './components/Comment.vue';
import Commentline from './components/CommentLine.vue';
import { getDetail, setComments, followings, delfollowings } from '@/apis';
export default {
  name: 'HeimaMIndex',
  created() {
    this.getDetail();
  },
  components: {
    Commentline,
    Comment
  },
  data() {
    return {
      artical: {},
      isshowpop: false,
      textvalue: ''
    };
  },

  mounted() {},
  computed: {
    isfollow() {
      return !this.artical.is_followed;
    }
  },
  methods: {
    async getDetail() {
      const id = this.$store.state.id;
      const res = await getDetail(id);
      // console.log(res);
      // console.log(this.$children);
      this.artical = res.data.data;
      console.log(this.artical);
    },
    onClickLeft() {
      this.$router.back();
    },
    async setComments() {
      const id = this.$store.state.id;
      const content = this.textvalue;
      const res = await setComments(id, content, id);
      console.log(res);
      this.isshowpop = false;
      this.$refs.com.getComments();
      this.textvalue = '';
    },
    async followings(id) {
      const res = await followings(id);
      console.log(res);
      this.artical.is_followed = !this.artical.is_followed;
    },
    async delfollowings(id) {
      const res = await delfollowings(id);
      console.log(res);
      this.artical.is_followed = !this.artical.is_followed;
    }
  }
};
</script>

<style lang="less" scoped>
@import './github-markdown.css' ;
.container {
  padding-top: 46px;
  padding-bottom: 100px;
  // width: 375px;
}
.navbar {
  background-color: greenyellow;
  position: fixed;
  left: 0;
  top: 0;
  width: 750px;
  z-index: 99;
}
:deep(.content) {
  font-size: 12px;

  display: flex;
  // position: absolute;
  flex: 1;
  overflow-y: auto;
  //   width: 100%;
}
.commentlist {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: hotpink;
}
.text {
  margin: 20px 5px 0 15px;
  width: 80%;
  height: 60%;
}
.btn {
  width: 110px;
}
.row2 {
  .van-col {
    height: 100%;
  }
}
</style>
