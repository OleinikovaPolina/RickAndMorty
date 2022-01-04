<template>
  <v-container>
    <template v-if="load && !err && !networkError">
      <Breadcrumbs :items="items"></Breadcrumbs>
      <v-card class="mx-auto mb-4">
        <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">{{ episode.name }}</v-card-title>
        <v-card-text class="pt-0 text--primary">

          <div class="mt-4 text-subtitle-2">
            Air date:
          </div>
          <div>{{ episode.air_date }}</div>

          <div class="mt-4 text-subtitle-2">
            Episode code:
          </div>
          <div>{{ episode.episode }}</div>

          <v-row class="ma-0">
            <div class="mt-4 text-subtitle-2">
              Characters ({{ episode.characters.length }}):
            </div>
            <v-btn
                @click="getCharacters"
                v-if="episode.characters.length>0"
                class="mx-2 mt-2"
                fab
                dark
                x-small
            >
              <v-icon dark>
                {{ showCharacters ? 'mdi-minus' : 'mdi-plus' }}
              </v-icon>
            </v-btn>
          </v-row>
          <template v-if="showCharacters">
            <v-chip-group
                active-class="primary--text"
                column
                v-if="loadCharacters"
            >
              <router-link class="text-decoration-none "
                           v-for="character in episode.characters"
                           :to="'/character/'+character.id"
                           :key="character.id">
                <v-chip>{{ character.name }}</v-chip>
              </router-link>
            </v-chip-group>
            <div v-else>
              <v-progress-circular
                  indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </template>
    <div v-else-if="err">
      <NotFound></NotFound>
    </div>
    <div v-else-if="networkError">
      <NetworkError></NetworkError>
    </div>
    <div v-else class="text-center pt-16">
      <v-progress-circular
          indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import NetworkError from "../components/NetworkError";
import NotFound from "../components/NotFound";

export default {
  name: "Episode",
  components: {NetworkError, NotFound,Breadcrumbs},
  data: () => ({
    err: false,
    networkError: false,
    episode: {characters: []},
    load: false,
    loadCharacters: false,
    showCharacters: false,
    startLoadCharacters: false,
    items: [
      {
        text: 'Episodes',
        disabled: false,
        href: '/episodes',
      }
    ]
  }),
  methods: {
    async getCharacters() {
      this.showCharacters = !this.showCharacters
      if (!this.startLoadCharacters) {
        this.startLoadCharacters = true
        let allId = []
        for (let i = 0; i < this.episode.characters.length; i++) {
          let oneId = this.episode.characters[i].split('/')
          allId.push(oneId[oneId.length - 1])
        }
        await axios
            .get('https://rickandmortyapi.com/api/character/' + allId.join())
            .then(res => {
              this.episode.characters = res.data
            })
            .catch(() => {
            })
        this.loadCharacters = true
      }
    }
  },
  async mounted() {
    await axios
        .get('https://rickandmortyapi.com/api/episode/' + this.$route.params.id)
        .then(res => {
          this.episode = res.data
          this.items.push({
            text: 'Episode ' + this.episode.name,
            disabled: true,
            href: '/episode' + this.$route.params.id,
          })
        })
        .catch((err) => {
          this.networkError = false
          if (!err.response) {
            this.networkError = true
          } else if (err.response.status === 404) {
            this.err = true
          }
        })
    this.load = true
  }
}
</script>