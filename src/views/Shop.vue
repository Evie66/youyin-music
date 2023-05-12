<template>
  <div>
    <van-nav-bar  left-arrow :border=false @click-left="onClickLeft">
      <template #right>
        <van-icon name="like-o" size="20" style="margin-right:5px;" />关注
      </template>
    </van-nav-bar>
        <!-- tab栏标签 -->
        <van-submit-bar v-if="active==0" :price="3050" button-text="去结算" />
    <van-tabs v-model="active" animated sticky  color="#ff8926" line-height="5px">
      <van-tab title="点餐">
          <div class="goods">
            <van-tree-select :items="category" :main-active-index.sync="selected" height="100vh">
              <template #content>
                <div style="flex:1;margin-left:5px;">
                  <van-grid :column-num="1" class="goods" :border=false style="margin-bottom:50px;">
                    <van-grid-item v-for="(item, index) in foods" :key="index">
                      <div class="orderItem">
                        <div class="main">
                          <div class="main_left">
                            <img :src="item.cover+'@300w'" alt="">
                          </div>
                          <div class="main_right">
                            <div class="box">
                              <span class="shop_name">{{item.title}}</span>
                            </div>
                              <span class="order_time">丝绒触感，呈现北海道风味</span>
                            <div class="total">月售{{item.month_sales}}</div>
                            <div class="price">￥{{item.sell_price}}</div>
                          </div>
                        </div>
                        <van-stepper v-model="item.id" theme="round" button-size="22" min="0" disable-input class="stepper" 
                          @plus="addFood(item)"
                          @minus="subFood(item)"/>
                        <!-- <van-button v-else icon="plus" type="primary" color="#F7B61D" round size="mini"  class="orderBtn" @click="hidden" /> -->
                      </div>
                    </van-grid-item>                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                  </van-grid>
                </div>
              </template>
            </van-tree-select>
        </div>
      </van-tab>
      <van-tab title="评价"></van-tab>
      <van-tab title="商家"></van-tab>
    </van-tabs>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        selected: 0,  //侧边导航栏默认选中项
        active: 0,    //顶部tab栏默认选中项
        num: 0,     //商品数量
        category: [], //店铺侧边栏分类列表
        foods: '',    //店铺商品列表
        cart: [],  //购物车商品
      };
    },
    created () {
      
      },
    mounted () {
      this.getCategory()
      this.getFoodList()
      this.getCart()
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      hidden() {
        this.num=1
      },
      // 获取店铺商品列表数据
      getFoodList() {
        let id = this.$route.query.shopId
        console.log(id)
        this.axios.get(`/food?id=${id}&cate=1`).then(res=>{
          console.log(res);
          this.foods = res.data.data
        })
      },
      // 获取店铺侧边栏分类数据
      getCategory() {
        let id = this.$route.query.shopId
        console.log(id)
        this.axios.get(`/category?id=${id}`).then(res=>{
          console.log(res);
          res.data.data.map(item=>{
            this.category.push({
              text: item.name
            })
          })
          console.log(this.category)
        })
      },
      getCart() {
        let id = this.$route.query.shopId
        this.axios.get(`/user/cart?id=${id}&userId=1`).then((res)=>{
          console.log(res);
        })
      },
      addFood(item) {
        // this.cart.push(item)
        console.log(item)
      },
      subFood(item) {
        
      }
    },
    watch: {
      selected(newValue) {
        console.log(newValue);
        let id = this.$route.query.shopId
        this.axios.get(`/food?id=${id}&cate=${newValue+1}`).then(res=>{
          console.log(res);
          this.foods = res.data.data
        })
      }
    },
  }
</script>

<style lang="scss">
.van-nav-bar {
  .van-icon {
    color: #080F1A;
  }
}
.goods {
  .van-sidebar-item--select::before {
    height: 100%;
    width: 2px;
    background: #ff743f;
  }
    .van-grid-item {
      .van-grid-item__content {
        display: block;
        padding: 0;
        .orderItem {
          position: relative;
          // width: 90%;
          box-sizing: border-box;
          // background: lightgray;
          margin: 10px 0;
          .main {
            display: flex;
            align-items: center;
            .main_left {
              width: 88px;
              height: 88px;
              margin-right: 8px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
              }
            }
            .main_right {
              overflow: hidden;/*超出部分隐藏*/
              white-space: nowrap;/*不换行*/
              text-overflow:ellipsis;/*超出部分文字以...显示*/
              flex: 1;
              padding-top: 8px;
              .box {
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                .state {
                  font-size: 15px;
                }
              }
              .order_time {
                color: #666;
                margin-bottom: 30px;
                font-size: 12px;
              }
              .total {
                margin-bottom: 10px;
                color: #FE9A02;
                font-size: 12px;
              }
              .price {
                color: #F1543B;
              }
            }
          }
          .orderBtn {
            position: absolute;
            right: 5px;
            bottom: 6px;
            color: #fff!important;
            border: 0;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #F7B61D;
          }
          .stepper {
            position: absolute;
            right: 5px;
            bottom: 6px;
          }
        }
      }
    }
}
.van-stepper--round .van-stepper__plus {
  background-color: #F7B61D!important;
}
.van-stepper--round .van-stepper__minus {
  color: #F7B61D!important;
  border: 1px solid #F7B61D!important;
}
.van-submit-bar__button--danger {
  background: linear-gradient(90deg,#ff9124,#ff4a2f)!important;
}
.van-tree-select__nav {
  // flex: none;
  // width: 80px!important;
}
</style>