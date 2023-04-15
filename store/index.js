export const state = () => ({
    events: [],
  });
  
  export const getters = {
    sortedEvents: (state) => {
      return state.events.slice().sort((a, b) => new Date(a.acf.start_time) - new Date(b.acf.start_time));
    },
  };
  
  export const mutations = {
    SET_EVENTS: (state, events) => {
      state.events = events;
    },
  };
  
  export const actions = {
    async getEvents({ state, commit }) {
      // if events is already set, stop
      if (state.events.length) return;
      try {
        let events = await this.$axios.$get(`/wp-json/wp/v2/events?page=1&per_page=100&_embed=1`);
        // filter out unnecessary data
        events = events.map(({ id, slug, title, content, acf }) => ({
          id,
          slug,
          title,
          content,
          acf,
        }));
        commit('SET_EVENTS', events);
      } catch (err) {
        console.error('getEvents', err);
      }
    },
  };