<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="tosearch(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/apis';
export default {
  name: 'HeimaMSearchSuggestion',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  computed: {
    highlightData() {
      const reg = new RegExp(this.keywords, 'ig');
      return this.suggestions.map((str) =>
        str?.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      );
    }
  },
  data() {
    return {
      suggestions: []
    };
  },

  mounted() {},
  watch: {
    keywords: {
      handler() {
        this.getSearchSuggestions();
      },
      immediate: true
    }
  },
  methods: {
    async getSearchSuggestions() {
      const res = await getSearchSuggestions(this.keywords);
      // console.log(res);
      if (res.data.data.options.length === 0) {
        this.$toast.fail('没有搜索建议');
      }
      this.suggestions = res.data.data.options.filter(Boolean); // 过滤假值
    },
    tosearch(index) {
      this.$emit('tosearchsug', this.suggestions[index]);
    }
  }
};
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
