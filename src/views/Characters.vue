<template>
  <v-item-group>
    <v-container>
      <FilterCharacters v-on:change="activeFilter"
                        :statusValue="status"
                        :genderValue="gender"
                        :speciesValue="species"
                        :nameValue="name"/>
      <template v-if="characters.length>0 && load">
        <v-row>
          <v-col
              v-for="character in characters"
              :key="character.id"
              cols="12"
              md="6"
          >
            <CardCharacter :character="character" :episodes="episodes"/>
          </v-col>
        </v-row>
        <div class="text-center pt-5">
          <v-pagination
              v-model="page"
              :length="characterInfo.pages"
              :total-visible="7"
              color="grey"
          ></v-pagination>
        </div>
      </template>
      <template v-else-if="characters.length===0 && load">
        <NotFound></NotFound>
      </template>
      <div v-else class="text-center pt-16">
        <v-progress-circular
            indeterminate
        ></v-progress-circular>
      </div>
    </v-container>
  </v-item-group>
</template>

<script>
import CardCharacter from "../components/CardCharacter"
import FilterCharacters from "../components/FilterCharacters";
import axios from "axios"
import NotFound from "../components/NotFound";

export default {
  name: "Characters",
  components: {NotFound, CardCharacter, FilterCharacters},
  data: () => ({
    characters: [],
    characterInfo: {},
    episodes: [],
    page: null,
    status: null,
    gender: null,
    species: null,
    name: null,
    load: false
  }),
  methods: {
    async getCharacters(page = this.page) {
      await axios
          .get('https://rickandmortyapi.com/api/character', {
            params: {
              page: page,
              species: this.species,
              name: this.name,
              gender: this.gender,
              status: this.status
            }
          })
          .then(res => {
            this.characters = res.data.results
            this.characterInfo = res.data.info
          })
          .catch(() => {
            this.characters = []
            this.characterInfo = {}
          });
    },
    async activeFilter(active) {
      this.load = false
      Object.keys(active).forEach(x => {
        this[x] = active[x]
      })
      await this.getCharacters(1)
      this.load = true
    },
    update() {
      this.status = this.$route.query.status || null
      this.gender = this.$route.query.gender || null
      this.species = this.$route.query.species || null
      this.name = this.$route.query.name || null
    }
  },
  async mounted() {
    let t = 1
    await axios
        .get('https://rickandmortyapi.com/api/episode/?page=1')
        .then(res => {
          this.episodes = res.data.results
          t = res.data.info.pages
        });
    for (let i = 2; i <= t; i++) {
      await axios
          .get('https://rickandmortyapi.com/api/episode/?page=' + i)
          .then(res => {
            this.episodes = this.episodes.concat(res.data.results)
          })
          .catch(() => {
          })
    }
    this.update()
    this.page = parseInt(this.$route.query.page) || 1
    this.load = true
  },
  watch: {
    async $route(to) {
      this.update()
      if (this.page === parseInt(to.query.page) || (this.page === 1 && !parseInt(to.query.page))) {
        await this.getCharacters()
      }
      this.page = parseInt(to.query.page) || 1;
    },
    page: {
      async handler() {
        this.load = false
        this.$router
            .push({query: {...this.$route.query, page: this.page}})
            .catch(() => {
            });
        await this.getCharacters()
        this.load = true
      }
    }
  },
}
</script>