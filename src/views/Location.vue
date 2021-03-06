<template>
  <v-container>
    <template v-if="load && !err && !networkError">
      <Breadcrumbs :items="items"></Breadcrumbs>
      <v-card class="mx-auto mb-4">
        <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">{{ location.name }}</v-card-title>
        <v-card-text class="pt-0 text--primary">

          <div class="mt-4 text-subtitle-2">
            Type:
          </div>
          <div>{{ location.type }}</div>

          <div class="mt-4 text-subtitle-2">
            Dimension:
          </div>
          <div>{{ location.dimension }}</div>

          <v-row class="ma-0">
            <div class="mt-4 text-subtitle-2">
              Residents ({{ location.residents.length }}):
            </div>
            <v-btn
                @click="getResidents"
                v-if="location.residents.length>0"
                class="mx-2 mt-2"
                fab
                dark
                x-small
            >
              <v-icon dark>
                {{ showResidents ? 'mdi-minus' : 'mdi-plus' }}
              </v-icon>
            </v-btn>
          </v-row>
          <template v-if="showResidents">
            <v-chip-group
                active-class="primary--text"
                column
                v-if="loadResidents"
            >
              <router-link class="text-decoration-none "
                           v-for="character in location.residents"
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
  name: "Location",
  components: {NetworkError, NotFound, Breadcrumbs},
  data: () => ({
    err: false,
    networkError: false,
    location: {residents: []},
    load: false,
    loadResidents: false,
    showResidents: false,
    startLoadResidents: false,
    items: [
      {
        text: 'Locations',
        disabled: false,
        href: '/locations',
      }
    ]
  }),
  methods: {
    async getResidents() {
      this.showResidents = !this.showResidents
      if (!this.startLoadResidents) {
        this.startLoadResidents = true
        let allId = []
        for (let i = 0; i < this.location.residents.length; i++) {
          let oneId = this.location.residents[i].split('/')
          allId.push(oneId[oneId.length - 1])
        }
        await axios
            .get('https://rickandmortyapi.com/api/character/' + allId.join())
            .then(res => {
              this.location.residents = res.data
            })
            .catch(() => {
            })
        this.loadResidents = true
      }
    }
  },
  async mounted() {
    await axios
        .get('https://rickandmortyapi.com/api/location/' + this.$route.params.id)
        .then(res => {
          this.location = res.data
          this.items.push({
            text: 'Location ' + this.location.name,
            disabled: true,
            href: '/location' + this.$route.params.id,
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