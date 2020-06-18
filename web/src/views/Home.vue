<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/slider1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/slider2.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/slider3.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/slider4.jpg" />
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i></i>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <span>收起</span>
      </div>
    </div>
    <m-list-card icon="" categories="newsList" title="新闻资讯">
  
      <template #items="{category}">
        <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
            <span>[{{news.categoryName}}]</span>
            <span>|</span>
            <span>{{news.title}}</span>
            <span>{{news.date}}</span>
          </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      },
      newsCat:[
        {
          name:'热门',
          newsList:new Array(5).fill({}).map((v)=>({
              categoryName:'',
              title:'',
              date:''
            }))
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.pagination-home {
  .swiper-pagination-bullet {
    background: white;
    opacity: 1;
    border-radius: 0.1538rem;

    &.swiper-pagination-bullet-active {
      background: blue;
    }
  }
}
.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid grey;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
