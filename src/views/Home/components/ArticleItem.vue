<template>
  <div>
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
      @click="todetail(articleInfo.art_id)"
    />
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 1"
      @click="todetail(articleInfo.art_id)"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 3"
      @click="todetail(articleInfo.art_id)"
    >
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
import storage from '@/utils/storage';
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
      // console.log(art);
      const time = dayjs(art.pubdate).fromNow();
      const articleDesc = `${art.aut_name} ${art.comm_count}评论 ${time}`;
      return articleDesc;
    }
  },
  mounted() {},

  methods: {
    todetail(id) {
      this.$router.push(`/detail/${id}`);
      this.$store.state.id = id;
      storage.set('ART_ID', id);
    }
  }
};
</script>

<style scoped></style>
