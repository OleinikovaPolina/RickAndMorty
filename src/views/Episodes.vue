<template>
  <v-container>
    <v-row class="ma-0 align-stretch">
      <v-text-field
          v-model="name"
          outlined
          dense
          label="Name"
          hide-details="auto"
          clearable
          clear-icon="mdi-close-circle"
          :color="$vuetify.theme.dark?'white':'black'"
      >
        <v-icon slot="append"> mdi-magnify</v-icon>
      </v-text-field>
      <div>
        <v-btn @click="change(1)" height="100%">
          <v-icon v-if="$vuetify.breakpoint.xs">mdi-check</v-icon>
          {{ $vuetify.breakpoint.xs ? '' : 'Применить' }}
        </v-btn>
      </div>
    </v-row>
    <template v-if="episodes.length>0 && load">
      <v-row class="my-0">
        <v-col
            v-for="episode in episodes"
            :key="episode.id"
            cols="12"
            sm="6"
        >
          <CardEpisode :episode="episode"/>
        </v-col>
      </v-row>
      <div class="text-center pt-5">
        <v-pagination
            v-model="page"
            :length="episodesInfo.pages"
            :total-visible="7"
            color="grey"
        ></v-pagination>
      </div>
    </template>
    <template v-else-if="episodes.length===0 && load">
      <NotFound></NotFound>
    </template>
    <div v-else class="text-center pt-16">
      <v-progress-circular
          indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import CardEpisode from "../components/CardEpisode";
import NotFound from "../components/NotFound";

export default {
  name: "Episodes",
  components: {NotFound, CardEpisode},
  data: () => ({
    episodes: [],
    episodesInfo: {},
    load: false,
    page: 1,
    name: null
  }),
  async mounted() {
    this.page = parseInt(this.$route.query.page) || 1
    this.name = this.$route.query.name || null
    await this.getEpisodes()
  },
  methods: {
    async change(page = this.page) {
      this.$router
          .push({query: {...this.$route.query, page: page, name: this.name || undefined}})
          .catch(() => {
          });
      await this.getEpisodes()
    },
    async getEpisodes(page = this.page) {
      this.load = false
      await axios
          .get('https://rickandmortyapi.com/api/episode', {
            params: {
              page: page,
              name: this.name
            }
          })
          .then(res => {
            this.episodes = res.data.results
            this.episodesInfo = res.data.info
          })
          .catch(() => {
            this.episodes = []
            this.episodesInfo = {}
          })
      this.load = true
    }
  },
  watch: {
    async page() {
      this.$router
          .push({query: {...this.$route.query, page: this.page}})
          .catch(() => {
          });
      await this.getEpisodes()
    },
    async $route(to) {
      this.name = this.$route.query.name || null
      if (this.page === parseInt(to.query.page) || (this.page === 1 && !parseInt(to.query.page))) {
        await this.getEpisodes()
      }
      this.page = parseInt(to.query.page) || 1
    }
  }
}
</script>
