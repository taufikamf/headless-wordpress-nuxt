<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <div v-for="(event, index) in sortedEvents" :key="event.id">
      <div :key="index" class="lg:flex lg:max-w-screen-lg pb-8 lg:pb-16">
        <div class="lg:w-1/4">
          <img
            v-if="event.acf.image"
            :src="event.acf.image.sizes.large"
            :alt="event.acf.image.alt"
            class="w-64 h-64 object-cover mb-4 lg:mb-0"
          />
        </div>
        <div class="lg:w-3/4 lg:pl-8">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ event.title.rendered }}
          </h4>
          <h3 class="lg:text-2xl font-bold mb-2">
            {{ event.acf.speaker }}
          </h3>
          <time class="text-sm lg:text-lg font-mono block mb-2">
            {{ event.acf.start_time }} - {{ event.acf.end_time }}
          </time>
          <p class="mb-4" v-html="event.content.rendered"></p>
          <nuxt-link :to="`/events/${event.slug}`" class="btn-sm lg:btn btn-success mb-2 mr-2">
            Event Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['events']),
    ...mapGetters(['sortedEvents']),
  },

  created() {
    this.getEvents();
  },

  beforeMount() {
    const linkOfTheWebsiteUserCame = document.referrer;
    console.log("dateng dari sini", linkOfTheWebsiteUserCame)  
  },

  methods: {
    ...mapActions(['getEvents']),
  },
};
</script>
