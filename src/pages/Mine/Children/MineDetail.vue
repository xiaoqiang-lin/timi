<template>
  <div class="user-detail">
    <div class="title">基本信息</div>
    <div class="user-detail-group">
      <div class="avatar">
        <span>头像</span>
        <img src="../../../common/images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{user_phone}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible = true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sign"></span>
      </div>
      <button @click="saveUserInfo">保存修改</button>
    </div>
    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择出生年月-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate=startDate
      :endDate=endDate
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from 'moment';
  import {modifyUserInfo} from 'dao/login';
  import {Toast} from 'mint-ui';
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: "MineDetail",
    data() {
      return {
        user_sign: '',
        user_address: '',
        user_name: '',
        user_sex: '',
        user_phone: '',
        user_birthday: '',
        // 2. 性别
        sheetVisible: false,
        actions: [
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex},
        ],
        // 3. 出生年月日
        startDate: new Date('1960-01-01'),
        endDate: new Date(),
      }
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
    mounted(){
        this.user_sign = this.userInfo.sign || '';
        this.user_address = this.userInfo.address || '';
        this.user_name = this.userInfo.username || '';
        this.user_sex = this.userInfo.gender || '';
        this.user_phone= this.userInfo.telnum || '';
        this.user_birthday= this.userInfo.birthday || '';
    },
    methods: {
      ...mapActions([
        'syncUserInfo'
      ]),
      // 1. 修改性别
      selectSex(props) {
        // console.log(props);
        this.user_sex = props.name;
      },

      // 2. 修改日期
      handleBirthday(date){
        this.user_birthday = moment(date).format("YYYY年MM月DD日");
      }, 

      // 3. 修改用户信息
      async saveUserInfo(){
          // 3.1 请求接口
          let result = await modifyUserInfo({id:this.userInfo.id,username:this.user_name, gender:this.user_sex,address: this.user_address,birthday:this.user_birthday,sign:this.user_sign});
          result = result.data
          this.syncUserInfo(res.message)
          sessionStorage.setItem("userInfo",JSON.stringify(res.message))
        Toast({
           message: result.message,
           position: 'bottom',
           duration: 2000
        });
        // 3.3 返回主界面
        if(result.success_code === 200){
            // 3.4 更新本地数据
            this.$store.dispatch('getUserInfo');
            // 3.5 返回主界面
            setTimeout(()=>{
               this.$router.replace('/mine');
            }, 2000)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 100%
    height 100%
    .title
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .avatar
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
