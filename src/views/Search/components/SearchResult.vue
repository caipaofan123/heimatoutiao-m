<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in resultlist"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// import storage from '@/utils/storage';
import { getSearchResults } from '@/apis';
export default {
  name: 'HeimaMSearchResult',
  props: {
    keywords: {
      type: String,
      required: true
    }
    // history: {
    //   type: Array
    // }
  },
  data() {
    return {
      resultlist: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  created() {
    this.getSearchResults();
  },
  mounted() {},

  methods: {
    async getSearchResults() {
      const { data } = await getSearchResults(1, 20, this.keywords);
      console.log(data);
      this.resultlist = data.data.results;
      // this.history.push(this.keywords);
      // this.$emit('his', this.keywords);
      

      // console.log(this.resultlist);
      // this.page = data.data.page;
      // console.log(this.page);
    },
    async onLoad() {
      console.log(111);
      const res = await getSearchResults(this.page + 1, 20, this.keywords);
      console.log(res);
      this.resultlist.push(...res.data.data.results);
      this.page = res.data.data.page;
      console.log(this.page);
      this.loading = false;
      if (this.resultlist.length === res.data.data.total_count) {
        this.finished = true;
        this.loading = false;
        this.$toast.success('已全部加载完成');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
