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
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
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
      keywords: '',
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

  methods: {
    onSearch() {
      //   this.componentName = SearchResult;
      this.isShowSearchResults = true;
    },
    onCancel() {
      this.$router.go(-1);
    },
    visibleSearchSuggestion() {
      this.isShowSearchResults = false;
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
