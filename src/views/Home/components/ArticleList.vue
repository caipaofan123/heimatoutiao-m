<template>
  <div>
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="loadNextPage">
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :error.sync="error"
        error-text="出错了，请重新加载"
        finished-text="没有更多了!!!"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem';
import { getArticleList } from '@/apis';
export default {
  name: 'HeimaMArticleList',
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  created() {
    this.getArticleList();
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    };
  },

  mounted() {},

  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date());
        // console.log(data);
        this.articles = data.data.results;
        this.pre_timestamp = data.data.pre_timestamp;
        this.loading = false;
      } catch (error) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error(error.response.data.message);
        } else {
          this.$toast.fail('获取文章列表失败');
        }
      }
    },
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp);
        console.log(data);
        if (!data.data.pre_timestamp) {
          this.finished = true;
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results);
        } else {
          this.articles.push(...data.data.results);
        }
        this.pre_timestamp = data.data.pre_timestamp;
        // this.loading = false;
      } catch (error) {
        // const status = error.response.status;
        // if (status === 400) {
        //   throw new Error(error.response.data.message);
        // } else {
        //   this.$toast.fail('获取文章列表失败');
        // }
        this.error = true;
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    }
  }
};
</script>

<style scoped></style>
