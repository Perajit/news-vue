<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="mr-3">
        <v-img
          :src="require('./assets/logo.svg')"
          contain
          transition="scale-transition"
          width="24"
        />
      </div>
      <v-toolbar-title class="flex-1">News</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
