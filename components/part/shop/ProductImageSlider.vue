<template>
  <div v-if="images && images.length>0">
    <!--gallery-->
    <div
      :class="`swiper gallery`"
    >
      <div
        class="swiper-wrapper"
      >
        <div
          v-for="(item, i) in images"
          :key="`prod-img-${i}`"
          class="swiper-slide"
        >
          <img
            :src="item.url"
          >
        </div>
      </div>
    </div>

    <!--pagination-->
    <div
      class="my-3 swiper-pagination d-sm-none"
    ></div>

    <!--thumbs-->
    <v-slide-group
      v-model="currentSlide"
      center-active
      class="px-0 hidden-xs-only" mandatory show-arrows
    >
      <template slot="next">
        <v-icon
          color="lightGray"
          size="36"
        >arrow_left
        </v-icon>
      </template>
      <template slot="prev">
        <v-icon
          color="lightGray"
          size="36"
        >arrow_right
        </v-icon>
      </template>
      <v-slide-item
        v-for="(item, i) in images"
        :key="`prod-thumb-${i}`"
        v-slot="{ active, toggle }"
      >
        <v-card
          :class="`py-2 px-3 rounded-xl no-bg slider-thumb mb-2 ${active?'selected-slide':''}`"
          :ripple="false"
          height="89px"
          width="89px"
          @click="toggle"
        >
          <v-img
            :src="item.url"
            contain
            height="66px"
            max-height="66px"
            max-width="66px"
            width="66px"
          ></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
import SwiperCore, {Autoplay, EffectFade, Navigation, Pagination} from 'swiper/core';
import Swiper from 'swiper';

export default {
  name: 'ProductImageSlider',
  props: {
    images: {
      type: Array
    },
    renderSlider: {
      type: Number
    }
  },
  data: () => ({
    started: false,
    swiper: {},
    currentSlide: 0
  }),
  methods: {
    //setup & start slider
    startSlider() {
      SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

      if (Object.keys(this.swiper).length != 0) {
        this.swiper.destroy()
      }

      this.swiper = new Swiper('.gallery', {
        direction: 'horizontal',

        grabCursor: true,

        pagination: {
          el: '.swiper-pagination',
        },
      })

      this.currentSlide = 0

      this.started = true
    },
    goTo(i) {
      this.swiper.slideTo(i, 300, true)
    }
  },
  watch: {
    currentSlide() {
      this.goTo(this.currentSlide)
    },
    'swiper.activeIndex': {
      handler() {
        this.currentSlide = this.swiper.activeIndex
      }
    },
    renderSlider() {
      this.startSlider()
    }
  }
};
</script>

<style>
.swiper-slide {
  text-align: center;
}
.swiper-slide img {
  max-width: 100%;
}

.slider-thumb {
  border: 1px solid #ffffff !important;
  box-shadow: 0px 4px 4px #ffffff !important;
}

.selected-slide {
  border: 1px solid rgba(149, 148, 148, 0.3) !important;
  box-shadow: 0px 4px 4px rgba(149, 148, 148, 0.4) !important;
}

.v-slide-group__next, .v-slide-group__prev {
  min-width: 0 !important;
}

.swiper-pagination {
  position: relative !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-pagination-bullet {
  margin: 0 4px;
  width: 6px;
  height: 6px;
  background: #C4C4C4;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  width: 9px;
  height: 9px;
  background: #EFAB43;
}
</style>
