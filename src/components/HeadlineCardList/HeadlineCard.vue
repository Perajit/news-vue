<template>
  <v-card v-if="compact" :dark="dark">
    <v-img
      :src="headline.urlToImage || require('../../assets/logo.svg')"
      :gradient="dark
        ? 'to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.0)'
        : 'to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.0)'"
      height="220"
    >
      <div class="fill-height d-flex flex-column justify-space-between">
        <div class="pa-3">
          <slot name="actions" />
        </div>
        <div class="pa-3" :class="dark ? 'alpha-black' : 'alpha-white'">
          <v-card-text
            data-field="publishedAt"
            class="text-subtitle-2 font-weight-regular py-0"
          >
            {{ headline.publishedAt | formatDate('DD MMM YYYY') }}
          </v-card-text>
          <v-card-text
            data-field="title"
            class="text-body-1 font-weight-bold pt-2 pb-0 line-clamp-3"
          >
            {{ headline.title }}
          </v-card-text>
        </div>
      </div>
    </v-img>
  </v-card>
  <v-card v-else :dark="dark" height="370">
    <v-img
      :src="headline.urlToImage || require('../../assets/logo.svg')"
      :gradient="dark
        ? 'to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)'
        : 'to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)'"
      height="160"
    >
      <slot name="actions" />
    </v-img>
    <div class="pa-5">
      <v-card-text
        data-field="publishedAt"
        class="text-subtitle-2 font-weight-regular py-0"
      >
        {{ headline.publishedAt | formatDate('DD MMM YYYY') }}
      </v-card-text>
      <v-card-text
        data-field="title"
        class="text-body-1 font-weight-bold pt-2 pb-0 line-clamp-3"
      >
        {{ headline.title }}
      </v-card-text>
      <v-card-text
        data-field="description"
        class="text-body-2 pt-2 pb-0 line-clamp-3"
      >
        {{ headline.description }}
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import { VCard, VCardText, VImg } from 'vuetify/lib';

export default {
  components: {
    VCard,
    VCardText,
    VImg,
  },
  props: {
    headline: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/main.sass';

.alpha-black {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
}

.alpha-white {
  background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75));
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
