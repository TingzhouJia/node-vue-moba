<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        :class="{active:active===index}"
        class="nav-item"
        v-for="(category,index) in categories"
        :key="index"
        :click="$refs.list.swiper.slideTo(index)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex">
        <swiper-slide v-for="(category,index) in categories" :key="index">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>

export default {

   
  props: {
    icon: { type: String },
    title: { type: String },
    categories: { type: Array }
  },
  data() {
    active: 0;
  }
};
</script>

<style>
</style>