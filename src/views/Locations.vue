<template>
  <v-container>
    <v-row class="ma-0 align-stretch">
      <v-col
          cols="12"
          sm="3"
          class="px-0 pr-sm-3 py-sm-0"
      >
        <v-text-field
            v-model="name"
            outlined
            dense
            label="Name"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
            :color="$vuetify.theme.dark?'white':'black'"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="3"
          class="px-0 px-sm-3 py-sm-0"
      >
        <v-text-field
            v-model="type"
            outlined
            dense
            label="Type"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
            :color="$vuetify.theme.dark?'white':'black'"
        >
        </v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="3"
          class="px-0 px-sm-3 py-sm-0"
      >
        <v-text-field
            v-model="dimension"
            outlined
            dense
            label="Dimension"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
            :color="$vuetify.theme.dark?'white':'black'"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="3"
          class="px-0 pl-sm-3 py-sm-0"
      >
        <v-btn @click="change(1)"
               :height="$vuetify.breakpoint.xs?'':'100%'"
               width="100%">
          Применить
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="locations.length>0 && load">
      <v-row class="my-0">
        <v-col
            v-for="location in locations"
            :key="location.id"
            cols="12"
            sm="6"
        >
          <CardLocation :location="location" v-on:getLocations="getLocations"/>
        </v-col>
      </v-row>
      <div class="text-center pt-5">
        <v-pagination
            v-model="page"
            :length="locationsInfo.pages"
            :total-visible="7"
            color="grey"
        ></v-pagination>
      </div>
    </template>
    <div v-else-if="networkError">
      <NetworkError></NetworkError>
    </div>
    <template v-else-if="locations.length===0 && load">
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
import CardLocation from "../components/CardLocation";
import NotFound from "../components/NotFound";
import NetworkError from "../components/NetworkError";

export default {
  name: "Location",
  components: {NotFound, NetworkError, CardLocation},
  data: () => ({
    networkError: false,
    locations: [],
    locationsInfo: {},
    load: false,
    page: 1,
    name: null,
    type: null,
    dimension: null
  }),
  async mounted() {
    this.page = parseInt(this.$route.query.page) || 1
    this.name = this.$route.query.name || null
    this.type = this.$route.query.type || null
    this.dimension = this.$route.query.dimension || null
    await this.getLocations()
  },
  methods: {
    async getLocations(page = this.page) {
      this.load = false
      await axios
          .get('https://rickandmortyapi.com/api/location', {
            params: {
              page: page,
              name: this.name,
              type: this.type,
              dimension: this.dimension
            }
          })
          .then(res => {
            this.locations = res.data.results
            this.locationsInfo = res.data.info
          })
          .catch((err) => {
            this.locations = []
            this.locationsInfo = {}
            if (!err.response) {
              this.networkError = true
            } else {
              this.networkError = false
            }
          })
      this.load = true
    },
    async change(page = this.page) {
      this.$router
          .push({
            query: {
              ...this.$route.query,
              page: page,
              name: this.name || undefined,
              type: this.type || undefined,
              dimension: this.dimension || undefined
            }
          })
          .catch(() => {
          });
      await this.getLocations()
    },
  },
  watch: {
    async page() {
      this.$router
          .push({query: {...this.$route.query, page: this.page}})
          .catch(() => {
          });
      await this.getLocations()
    },
    async $route(to) {
      this.name = this.$route.query.name || null
      this.type = this.$route.query.type || null
      this.dimension = this.$route.query.dimension || null
      if (this.page === parseInt(to.query.page) || (this.page === 1 && !parseInt(to.query.page))) {
        await this.getLocations()
      }
      this.page = parseInt(to.query.page) || 1
    }
  }
}
</script>
