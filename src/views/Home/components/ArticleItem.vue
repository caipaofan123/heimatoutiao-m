<template>
  <div>
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
    />
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 1"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell :title="articleInfo.title" v-if="articleInfo.cover.type === 3">
      <template #label>
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="3rem"
          height="2rem"
          :src="item"
        />
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs';
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo;
      const time = dayjs(art.pubdate).fromNow();
      const articleDesc = `${art.aut_name} ${art.comm_count}评论 ${time}`;
      return articleDesc;
    }
  },
  mounted() {},

  methods: {}
};
</script>

<style scoped></style>
