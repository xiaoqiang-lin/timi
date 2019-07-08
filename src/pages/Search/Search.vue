<template>
  <div class="search" v-if="goods.length">
    <search-bar></search-bar>
    <div class="wrapper">
      <aside class="menu-wrapper">
        <ul class="menu">
          <li class="menu-item" v-for="(type,index1) in goods" :key="index1" :class="{current: index1 === currentIndex}" ref="typeList" @click="clickHandler(index1)">
            <span class="type-name">{{type.name}}</span>
          </li>
        </ul>
      </aside>
      <section class="showcase">
        <ul class="group">
          <li v-for="(group,index) in goods" :key="index" ref="groupList">
            <div class="group-header">
              <h4 class="group-title">{{group.name}}</h4>
              <a href="">查看更多 ></a>
            </div>
            <ul>
              <li class="group-item" v-for="(item,index2) in group.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone, index3) in goods.category" :key="index3">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
    <search-panel v-show="false"></search-panel>
  </div>
</template>

<script>
  import {getSearchPageData} from 'dao/search'
  import SearchBar from 'components/SearchBar/SearchBar'
  import SearchPanel from 'components/SearchPanel/SearchPanel'
  import BScroll from 'better-scroll'
  export default {
    name: "Search",
    data(){
      return{
        goods: [],
        scrollY: 0,
        PosList: []
      }
    },
    mounted(){
      getSearchPageData().then((val) => {
        this.goods = val.data.message.data
      })
    },
    components: {
      SearchBar,
      SearchPanel
    },
    watch: {
      goods(){
        this.$nextTick(() =>{
          this._initBScroll()
          this._calculatePosList ()
        })
      }
    },
    methods: {
      _initBScroll(){
        this.anchor = new BScroll(".menu-wrapper",{
          click: true
        })
        this.target = new BScroll(".showcase",{
          probeType:3
        })
        this.target.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y);
        })
      },
      _calculatePosList () {
        const items = this.$refs.groupList
        let height = 0
        this.PosList.push(height)
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          if(i===items.length-1){
             item.style.paddingBottom =`${window.innerHeight - item.clientHeight - 100}px`;
          }
          height += item.clientHeight
          this.PosList.push(height)
        }
      },
      _scrollToAnchor(index){
        let el = this.$refs.typeList[index]
        this.anchor.scrollToElement(el, 0, 0, -100);
      },
      clickHandler(index){
        this.scrollY = this.PosList[index];
        this.target.scrollTo(0, -this.scrollY, 300);
      }
    },
    computed: {
      currentIndex(){
        const {scrollY, PosList,} = this;
        return PosList.findIndex((pos,index) =>{
          this._scrollToAnchor(index)
          return scrollY >= pos && scrollY < PosList[index+1]
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    background-color #F5F5F5
    width 100%
    height 100%
    overflow hidden
    .wrapper
      position absolute
      top 60px
      display flex
      bottom 50px
      overflow hidden
      .menu-wrapper
        display inline-block
        flex 0 0 80px
        height 100%
        background-color #e0e0e0
        overflow hidden
        .menu
          .menu-item
            width 80px
            height 60px
            display flex
            flex-direction column
            justify-content center
            align-items center
            border-bottom-1px(#ccc)
            background-color #fafafa
            text-align center
            font-weight lighter
            color #666666
            position relative
          .current
            color #e02e24
          .current::before
            content: ''
            background-color #e02e24
            width 4px
            height 30px
            position absolute
            left 0
      .showcase
        flex 1
        display inline-block
        background-color #fff
        overflow hidden
        .group
          .group-header
            display flex
            color #999
            padding 0 10px
            height 44px
            justify-content space-between
            align-items center
            a
              text-decoration none
              font-weight lighter
              float right
              color #999
          ul
            display inline-flex
            flex-wrap wrap
            .group-item
              display flex
              flex-direction column
              width 33.3%
              height 90px
              justify-content center
              align-items center
              color #666
              font-weight lighter
              font-size 14px
              img
                width 60%
                height 60%
                margin-bottom 5px
            .phone-type
              width 100%
              display flex
              flex-direction row
              flex-wrap wrap
              border-bottom-1px #ccc
              li
                width 33.3%
                display flex
                justify-content center
                align-items center
                margin 5px 0
                img
                  width 70%
</style>
