<template functional>
  <v-container v-if="props.headline" class="px-6 px-sm-8">
    <h2 class="text-h6 my-3">{{ props.headline.title }}</h2>
    <div class="text-subtitle-2 my-1">
      <div class="d-inline-block mr-3">
        <v-icon small class="mr-1">mdi-earth</v-icon>
        <span class="font-weight-bold pink--text">{{ props.headline.source.name }}</span> •
        <span class="font-weight-bold">{{ props.headline.author }}</span>
      </div>
      <div class="d-inline-block">
        <v-icon small>mdi-clock-outline</v-icon>
        <span class="text--secondary">
          {{ props.headline.publishedAt | formatDate('DD MMMM YYYY HH:mm:ss') }}
        </span>
      </div>
    </div>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-img :src="props.headline.urlToImage" max-height="40vh" contain class="mt-6"/>
      </v-col>
      <v-col>
        <div class="text-body-1 mt-6 pl-sm-5">{{ props.headline.description }}</div>
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-btn
        :href="props.headline.url"
        target="_blank"
        color="primary"
        text
        class="mt-3"
      >
        Read full article
      </v-btn>
      <v-btn
        link
        to="/"
        text
        class="mt-3"
      >
        Back
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    headline: {
      type: Object,
      required: true,
    },
  },
};
</script>
