<template>
  <v-container>
    <template v-if="load && !err && !networkError">
      <Breadcrumbs :items="items"></Breadcrumbs>
      <v-card
          class="mx-auto mb-4"
      >
        <v-row class="ma-0">
          <v-col
              class="pa-0"
              cols="12"
              sm="4">
            <v-img
                height="100%"
                width="100%"
                :src="character.image"
            />
          </v-col>
          <v-col
              cols="12"
              class="pb-0 pa-md-0 "
              sm="8">
            <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">
              {{ character.name }}
            </v-card-title>

            <v-card-text>
              <v-row class="ma-0">
                <v-icon x-small
                        :style="{ color: character.status==='Alive' ? 'green' : character.status==='unknown' ? '' : 'red' }">
                  mdi-circle
                </v-icon>
                <div class="ms-1">
                  {{ character.status + ' - ' + character.species }}
                </div>
              </v-row>

              <div class="mt-4 text-subtitle-2">
                Gender:
              </div>
              <div>{{ character.gender }}</div>

              <div class="mt-4 text-subtitle-2">
                Origin:
              </div>
              <router-link v-if="character.origin.url!==''"
                           class="text-decoration-none text--primary"
                           :to="'/location/'+character.origin.url.split('/')[character.origin.url.split('/').length-1]">
                <div class="text--primary">{{ character.origin.name }}</div>
              </router-link>
              <div class="text--primary" v-else>{{ character.origin.name }}</div>

              <div class="mt-4 text-subtitle-2">
                Last known location:
              </div>
              <router-link v-if="character.location.url!==''"
                           class="text-decoration-none text--primary"
                           :to="'/location/'+character.location.url.split('/')[character.location.url.split('/').length-1]">
                <div class="text--primary">{{ character.location.name }}</div>
              </router-link>
              <div class="text--primary" v-else>{{ character.location.name }}</div>

              <div class="mt-4 text-subtitle-2">
                First seen in:
              </div>
              <router-link class="text-decoration-none text--primary"
                           :to="'/episode/'+episodes.filter(x => x.url === character.episode[0])[0].id">
                <div>{{ episodes.filter(x => x.url === character.episode[0])[0].name }}</div>
              </router-link>
            </v-card-text>
          </v-col>
        </v-row>
        <div class="pa-8 pt-0 pt-sm-4">
          <div class=" text-subtitle-2">
            Episodes:
          </div>
          <v-chip-group
              active-class="primary--text"
              column
          >
            <router-link class="text-decoration-none "
                         v-for="episode in character.episode"
                         :key="episode"
                         :to="'/episode/'+episodes.filter(x => x.url === episode)[0].id">
              <v-chip>{{ episodes.filter(x => x.url === episode)[0].name }}</v-chip>
            </router-link>
          </v-chip-group>
        </div>
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
import axios from "axios"
import Breadcrumbs from "../components/Breadcrumbs"
import NotFound from "../components/NotFound";
import NetworkError from "../components/NetworkError";

export default {
  name: "Character",
  components: {NetworkError, NotFound, Breadcrumbs},
  data: () => ({
    load: false,
    character: {},
    err: false,
    networkError: false,
    items: [
      {
        text: 'Characters',
        disabled: false,
        href: '/characters',
      }
    ]
  }),
  async mounted() {
    let allId = Array.from({length: 51}, (v, k) => k + 1).join()
    await axios
        .get('https://rickandmortyapi.com/api/episode/' + allId)
        .then(res => {
          this.episodes = res.data
        })
        .catch(() => {
        })
    await axios
        .get('https://rickandmortyapi.com/api/character/' + this.$route.params.id)
        .then(res => {
          this.character = res.data
          this.items.push({
            text: 'Character ' + this.character.name,
            disabled: true,
            href: '/character/' + this.$route.params.id,
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
