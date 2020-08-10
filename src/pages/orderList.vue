<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>温馨提示：请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="list-body">
      <div class="container">
        <ul class="list">
          <li class="list-item" v-for="(item,index) in orderList" :key="index">
            <div class="item-header clearfix">
              <div class="header-left fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span> 在线支付
              </div>
              <div class="header-right fr">
                应付金额：
                <span>{{item.payment}}</span> 元
              </div>
            </div>
            <div class="item-body clearfix">
              <ul class="goods-list fl">
                <li class="goods-item" v-for="(sub,i) in item.orderItemVoList" :key="i">
                  <img v-lazy="sub.productImage" alt />
                  <div class="info">
                    <p>{{sub.productName}}</p>
                    <p>{{sub.currentUnitPrice}}X{{sub.quantity}}元</p>
                  </div>
                </li>
              </ul>
              <div class="goods-state fr" v-if="item.status===10" @click="goPay(item.orderNo)">未支付</div>
              <div class="goods-state fr" v-else>{{item.statusDesc}}</div>
            </div>
          </li>
        </ul>
        <loading v-show="loading"></loading>
        <no-data v-if="!loading && orderList.length === 0"></no-data>
        <!-- <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="getNextList"
          ></el-pagination>
        </div>-->
        <div class="loadmore">
          <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="311"
          ></div>
          <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt v-if="loadingMore" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import Loading from '../components/loading'
import NoData from '../components/NoData'
// import { Pagination } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  data () {
    return {
      orderList: [], // 订单列表
      loading: true, // 展示加载组件
      total: 0, // 订单的总数
      pageNum: 273, // 当前页数
      busy: true,
      loadingMore: false
    }
  },
  components: {
    OrderHeader,
    Loading,
    NoData,
    // [Pagination.name]: Pagination
  },
  methods: {
    // getOrderList () {
    //   this.axios.get('api/orders', {
    //     params: {
    //       pageNum: this.pageNum
    //     }
    //   }).then(res => {
    //     this.orderList = res.list
    //     this.total = res.total
    //     this.loading = false
    //   })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // },
    getOrderListForLoadMore () {
      this.busy = true
      this.axios.get('api/orders', {
        params: {
          pageNum: this.pageNum
        }
      }).then(res => {
        this.orderList = this.orderList.concat(res.list)
        this.total = res.total
        this.loading = false
        if (res.hasNextPage) {
          this.busy = false
          this.loadingMore = true
        } else {
          this.busy = true
          this.loadingMore = false
        }
      })
        .catch(() => {
          this.loadingMore = false
        })
    },
    goPay (orderId) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo: orderId
        }
      })
    },
    getNextList (val) {
      this.pageNum = val
      this.getOrderList()
    },
    loadMore () {
      this.busy = true
      window.setTimeout(() => {
        this.pageNum++
        this.getOrderListForLoadMore()
      }, 500)
    }
  },
  mounted () {
    this.getOrderListForLoadMore()

  },
  directives: { infiniteScroll }
}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/element-variables.scss';
.order-list {
  .list-body {
    padding: 30px 0;
    background-color: #f5f5f5;
    .container {
      // .page {
      //   text-align: right;
      // }
      .loadmore {
        text-align: center;
        img {
          width: 200px;
        }
      }
      .list {
        .list-item {
          margin-bottom: 30px;
          border: 1px solid #e5e5e5;
          .item-header {
            height: 74px;
            padding: 0 40px;
            font-size: 16px;
            color: #666;
            line-height: 74px;
            background-color: #fffaf7;
            .header-left {
              span {
                margin: 0 10px;
              }
            }
            .header-right {
              span {
                font-size: 26px;
                color: #333;
              }
            }
          }
          .item-body {
            padding: 20px 40px;
            background-color: #fff;
            .goods-list {
              .goods-item {
                @include flex();
                margin-bottom: 20px;
                img {
                  display: block;
                  width: 112px;
                  height: 112px;
                }
                .info {
                  font-size: 20px;
                  color: #333;
                }
              }
            }
            .goods-state {
              margin-top: 30px;
              font-size: 20px;
              color: $colorA;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
