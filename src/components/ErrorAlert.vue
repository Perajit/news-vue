<template functional>
  <v-alert
    v-if="props.error"
    type="error"
    border="left"
    prominent
    text
  >
    <div class="font-weight-bold" data-field="title">{{ props.title }}</div>
    <div v-if="props.error.response" data-field="detail">
      {{ props.error.response.status }}:
      {{ props.error.response.data.message }}
    </div>
    <div v-else-if="props.error.message" data-field="detail">
      {{ props.error.message }}
    </div>
  </v-alert>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    error: {
      type: [Error, Object],
    },
  },
};
</script>
