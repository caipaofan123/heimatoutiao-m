<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        background="hotpink"
        class="search"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @his="hisFn"
      @clear="clearFn"
      @tosearch="tosearchFn"
      @tosearchsug="tosearchsug"
      :history="history"
    ></component>
  </div>
</template>

<script>
import storage from '@/utils/storage';
import SearchHistory from './components/SearchHistory.vue';
import SearchResult from './components/SearchResult.vue';
import SearchSuggestion from './components/SearchSuggestion.vue';
export default {
  name: 'HeimaMSearch',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data() {
    return {
      // hiskey: '',
      keywords: '',
      history: storage.get('HISTORY') || [],
      isShowSearchResults: false
    };
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory';
      }
      if (this.isShowSearchResults) {
        return 'SearchResult';
      }
      return SearchSuggestion;
    }
  },
  mounted() {},
  watch: {
    history(value) {
      storage.set('HISTORY', value);
    }
  },
  methods: {
    onSearch() {
      //   this.componentName = SearchResult;
      this.isShowSearchResults = true;
      this.history.unshift(this.keywords);
      // storage.set('HISTORY', this.history);
    },
    onCancel() {
      this.$router.go(-1);
    },
    visibleSearchSuggestion() {
      this.isShowSearchResults = false;
    },
    hisFn() {
      storage.remove('HISTORY');
      this.history = [];
    },
    clearFn(index) {
      this.history.splice(index, 1);
    },
    tosearchFn(item) {
      this.keywords = item;
      this.onSearch();
    },
    tosearchsug(item) {
      this.keywords = item;
      this.onSearch();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
