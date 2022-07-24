<template>
  <div class="container">
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      background="hotpink"
    />

    <input
      type="file"
      ref="upimg"
      style="display: none"
      @change="upto($event)"
    />
    <van-cell title="头像" @click="upimg">
      <van-image
        class="right"
        round
        width="1rem"
        height="1rem"
        :src="user.photo"
      />
      <van-icon name="arrow" class="arrow" />
      <!-- <van-uploader ref="upimg" :after-read="afterRead" :show-upload="false" /> -->
    </van-cell>
    <van-cell title="昵称" @click="showNamePicker = true">
      <span class="right">{{ user.name }}</span>
      <van-icon name="arrow" class="arrow" />
    </van-cell>
    <van-cell title="性别" @click="genderpick">
      <span class="right">{{ { 0: '男', 1: '女' }[user.gender] }}</span>
      <van-icon name="arrow" class="arrow" />
    </van-cell>
    <van-cell title="生日" @click="setBirth">
      <span class="right">{{ user.birthday }}</span>
      <van-icon name="arrow" class="arrow" />
    </van-cell>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup v-model="showDayPicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dayConfirm"
        @cancel="showDayPicker = false"
      />
    </van-popup>

    <van-popup
      v-model="showNamePicker"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <input type="text" name="" id="" v-model="namevalue" />
      <van-button @click="upname">确认</van-button>
    </van-popup>

    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <updateavatar :imagUrl="imagUrl" v-if="isUpdatePhotoShow" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event"></updateavatar>
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>

<script>
import updateavatar from './components/updateavatar.vue';
import dayjs from '@/utils/dayjs';
import { getUser, editUser } from '@/apis';
export default {
  name: 'HeimaMIndex',
  created() {
    this.getUser();
  },
  components: {
    updateavatar
  },
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      user: {},
      showPicker: false,
      showDayPicker: false,
      showNamePicker: false,
      columns: [0, 1],
      namevalue: '',
      isUpdatePhotoShow: false,
      imagUrl: ''
    };
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },

    upimg() {
      this.$refs.upimg.click();
    },
    async upto(e) {
      //   console.log(e);
      const fileList = e.target.files.length;
      if (fileList === 0) return this.$toast.fail('请选择文件！');
      const file = e.target.files[0];
       this.imagUrl = window.URL.createObjectURL(file);
      
      // const res = await upPhoto(file);
      // console.log(file);
      this.isUpdatePhotoShow = true;
    },
    async getUser() {
      const res = await getUser();
      //   console.log(res);
      this.user = res.data.data;
    },
    genderpick() {
      this.showPicker = true;
    },
    onConfirm(value) {
      this.user.gender = value;
      this.showPicker = false;
      this.editUser();
    },
    setBirth() {
      this.showDayPicker = true;
    },
    dayConfirm(value) {
      this.user.birthday = dayjs(value).format('YYYY-MM-DD');
      this.showDayPicker = false;
      this.editUser();
    },
    upname() {
      this.showNamePicker = false;
      this.user.name = this.namevalue;
      this.editUser();
    },
    async editUser() {
      const res = await editUser(
        this.user.name,
        this.user.gender,
        this.user.birthday
      );
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-top: 100px;
  //   padding-bottom: 100px;
  // width: 375px;
}
.navbar {
  background-color: plum;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
.arrow {
  position: absolute;
  right: 0;
  top: 12px;
}
.right {
  margin-right: 40px;
}
</style>
