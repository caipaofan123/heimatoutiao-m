<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" v-if="isShow" @click="clickFn" />
      <div v-else>
        <span @click="delhis">全部删除</span>&nbsp;
        <span @click="isShow = true">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      v-show="isHis"
      @click="tosearch(item)"
    >
      <van-icon name="close" v-show="!isShow" @click.stop="clear(index)" />
    </van-cell>
  </div>
</template>

<script>
// import storage from '@/utils/storage';
export default {
  name: 'HeimaMSearchHistory',
  props: {
    history: {
      type: Array
    }
  },
  data() {
    return {
      isShow: true
      // history: storage.get('HISTORY')
    };
  },

  computed: {
    isHis() {
      if (this.history.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {},

  methods: {
    clickFn() {
      this.isShow = false;
    },
    delhis() {
      // storage.remove('HISTORY');
      this.$emit('his');
      // this.history = [];
    },
    clear(index) {
      this.$emit('clear', index);
    },
    tosearch(item) {
      this.$emit('tosearch', item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
