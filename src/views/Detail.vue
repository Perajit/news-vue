<template>
  <div class="detail">
    <HeadlineDetail v-if="selectedHeadline" :headline="selectedHeadline" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeadlineDetail from '@/components/HeadlineDetail.vue';

export default {
  name: 'Detail',
  components: {
    HeadlineDetail,
  },
  computed: {
    ...mapGetters('headline', ['selectedHeadline']),
  },
  mounted() {
    if (!this.selectedHeadline) {
      this.$router.push('/');
    }
  },
};
</script>
