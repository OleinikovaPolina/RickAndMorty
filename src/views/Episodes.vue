<template>
  <v-container>
    <v-col
        cols="12"
        class="px-0"
    >
      <v-text-field
          v-model="name"
          outlined
          dense
          label="Name"
          hide-details="auto"
          clearable
          clear-icon="mdi-close-circle"
      >
        <v-icon
            slot="append"
        >
          mdi-magnify
        </v-icon>
      </v-text-field>
    </v-col>
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
        ></v-pagination>
      </div>
    </template>
    <template v-else-if="episodes.length===0 && load">
      <div>not found</div>
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

export default {
  name: "Episodes",
  components: {CardEpisode},
  data: () => ({
    episodes: [],
    episodesInfo: {},
    load: false,
    page: 1,
    name: null
  }),
  async mounted() {
    await axios
        .get('https://rickandmortyapi.com/api/episode')
        .then(res => {
          this.episodes = res.data.results
          this.episodesInfo = res.data.info
        });
    this.load = true
  },
  methods: {
    async getEpisodes() {
      this.load = false
      await axios
          .get('https://rickandmortyapi.com/api/episode', {
            params: {
              page: this.page,
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
    page: {
      async handler() {
        await this.getEpisodes()
      },
      deep: true
    },
    name: {
      async handler() {
        this.page = 1
        await this.getEpisodes()
      },
      deep: true
    }
  }
}
</script>
