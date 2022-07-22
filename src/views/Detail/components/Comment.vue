<template>
  <div>
    <van-cell v-for="item in commentlist" :key="item.com_id">
      <van-icon name="good-job-o" />赞
      <template #icon>
        <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
      </template>
      <template #label>
        {{ item.content }}
        <p>
          {{ item.pubdate
          }}<van-button round size="mini" @click="huifu(item.com_id)"
            >回复0</van-button
          >
        </p>
      </template>
      <template #title>
        {{ item.aut_name }}
      </template>
    </van-cell>

    <van-popup v-model="isshowcom" position="bottom" :style="{ height: '80%' }">
      <van-cell>
        <van-icon name="good-job-o" />赞
        <template #icon>
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="jutiCom.aut_photo"
          />
        </template>
        <template #label>
          {{ jutiCom.content }}
          <p>
            {{ jutiCom.pubdate
            }}<van-button round size="mini">回复0</van-button>
          </p>
        </template>
        <template #title>
          {{ jutiCom.aut_name }}
        </template>
      </van-cell>
      <van-cell title="全部回复"></van-cell>

      <van-cell v-for="(item, index) in smcomlist" :key="index">
        <van-icon name="good-job-o" />赞
        <template #icon>
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
        </template>
        <template #label>
          {{ item.content }}
          <p>
            {{ item.pubdate }}<van-button round size="mini">回复0</van-button>
          </p>
        </template>
        <template #title>
          {{ item.aut_name }}
        </template>
      </van-cell>

      <van-row class="commentlist">
        <van-col span="12" @click="clickFn"
          ><van-button round size="small" class="van-btn"
            >写评论</van-button
          ></van-col
        >
      </van-row>
      <van-divider>没有更多了</van-divider>
      <van-popup
        v-model="isshowpop"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="text"
          v-model="textvalue"
        ></textarea>
        <van-button
          class="btn"
          round
          size="mini"
          @click="setComments(jutiCom.com_id)"
          >发布</van-button
        >
      </van-popup>
    </van-popup>
    <!-- <van-cell title="123"></van-cell> -->
  </div>
</template>

<script>
import { getComments, setComments } from '@/apis';
export default {
  name: 'HeimaMComment',
  created() {
    this.getComments();
  },
  // props: {
  //   artid: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  data() {
    return {
      commentlist: [],
      isshowcom: false,
      jutiCom: {},
      isshowpop: false,
      textvalue: '',
      smcomlist: []
    };
  },

  mounted() {},

  methods: {
    async getComments() {
      const id = this.$store.state.id;
      const res = await getComments('a', id);
      // console.log(res);
      this.commentlist = res.data.data.results;
      // console.log(this.commentlist);
    },

    async huifu(id) {
      this.isshowcom = true;
      const index = this.commentlist.findIndex((item) => item.com_id === id);
      this.jutiCom = this.commentlist[index];
      console.log(this.jutiCom);
      const { data } = await getComments('c', id);
      this.smcomlist = data.data.results;
    },
    clickFn() {
      this.isshowpop = true;
    },
    async setComments(comid) {
      const id = this.$store.state.id;
      const content = this.textvalue;
      const res = await setComments(comid, content, id);
      console.log(res);
      this.isshowpop = false;
      // this.smcomlist = await getComments('c', comid);
      const { data } = await getComments('c', comid);
      this.smcomlist = data.data.results;
      console.log(data);
      // this.$refs.com.getComments();
      this.textvalue = ''
    }
  }
};
</script>

<style lang="less" scoped>
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
    width: 600px;
    margin-bottom: 15px;
    margin-left: 50px;
  }
}
.text {
  margin: 20px 5px 0 15px;
  width: 80%;
  height: 60%;
}
.btn {
  width: 110px;
}
</style>
