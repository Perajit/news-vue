<template functional>
  <v-container v-if="props.headline" class="headline-detail px-6 px-sm-8">
    <h2 data-field="title" class="text-h6 my-3">{{ props.headline.title }}</h2>
    <div class="text-subtitle-2 my-1">
      <div class="d-inline-block mr-3">
        <v-icon small>mdi-earth</v-icon>
        <span data-field="sourceName" class="font-weight-bold pink--text">
          {{ props.headline.source.name }}
        </span>
        <template v-if="props.headline.author">
          •
          <span data-field="author" class="font-weight-bold">
            {{ props.headline.author }}
          </span>
        </template>
      </div>
      <div class="d-inline-block">
        <v-icon small>mdi-clock-outline</v-icon>
        <span data-field="publishedAt" class="text--secondary">
          {{ props.headline.publishedAt | formatDate('DD MMMM YYYY HH:mm:ss') }}
        </span>
      </div>
    </div>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-img :src="props.headline.urlToImage" max-height="40vh" contain class="mt-6"/>
      </v-col>
      <v-col>
        <div data-field="description" class="text-body-1 mt-6 pl-sm-5">
          {{ props.headline.description }}
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-btn
        data-action="openUrl"
        :href="props.headline.url"
        target="_blank"
        color="primary"
        text
        class="mt-3"
      >
        Read full article
      </v-btn>
      <v-btn
        data-action="back"
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
