<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :class="{ 'active-channel': item.name === '推荐' }"
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="item.id"
            @click="delMychannels(item, index)"
            ><template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon></template
          ></van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllchannels } from '@/apis';
export default {
  name: 'HeimaMEditChannelPopup',
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllchannels();
  },
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    };
  },

  mounted() {},
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id);
        // const result = this.myChannels.find((i) => i.id === item.id);
        // if (result) {
        //   return false;
        // } else {
        //   return true;
        // }
      });
    }
    // recommendList() {
    //   this.allChannels.forEach((item) => {
    //     if (!this.myChannels.includes(item)) {
    //       this.newarr.push(item);
    //     }
    //   });
    //   return this.newarr;
    // }
  },
  methods: {
    async getAllchannels() {
      const { data } = await getAllchannels();
      this.allChannels = data.data.channels;
      //   console.log(data);
    },
    delMychannels(item, index) {
      if (this.isEdit && item.name !== '推荐') {
        return this.$emit('delMychannels', item.id);
      }
      if (!this.isEdit) {
        this.isShow = false;
        this.$emit('change-active', index);
      }
    },
    addMyChannel(item) {
      this.$emit('add-mychannel', { ...item });
    }
  }
};
</script>

<style lang="less" scoped>
:deep(.van-grid-item__content) {
  background: #f4f5f6;
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      //   background: #f4f5f6;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 24px;
        height: 24px;
        width: 24px;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
    :deep(.active-channel) {
      .van-grid-item__text {
        color: hotpink;
      }
    }
  }

  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      //   background: #f4f5f6;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
