<template>
  <v-container>
    <v-row class="ma-0">
      <v-col
          cols="12"
          sm="4"
          class="px-0 pr-sm-3"
      >
        <v-text-field
            v-model="name"
            outlined
            dense
            label="Name"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="4"
          class="px-0 px-sm-3"
      >
        <v-text-field
            v-model="type"
            outlined
            dense
            label="Type"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
        >
        </v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="4"
          class="px-0 pl-sm-3"
      >
        <v-text-field
            v-model="dimension"
            outlined
            dense
            label="Dimension"
            hide-details="auto"
            clearable
            clear-icon="mdi-close-circle"
        ></v-text-field>
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
        ></v-pagination>
      </div>
    </template>
    <template v-else-if="locations.length===0 && load">
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
import CardLocation from "../components/CardLocation";

export default {
  name: "Location",
  components: {CardLocation},
  data: () => ({
    locations: [],
    locationsInfo: {},
    load: false,
    page: 1,
    name: null,
    type: null,
    dimension: null
  }),
  async mounted() {
    await axios
        .get('https://rickandmortyapi.com/api/location', {
          params: {
            page: this.page,
            name: this.name,
            type: this.type,
            dimension: this.dimension
          }
        })
        .then(res => {
          this.locations = res.data.results
          this.locationsInfo = res.data.info
        });
    this.load = true
  },
  methods: {
    async getLocations(active = {}) {
      Object.keys(active).forEach(x => {
        this[x] = active[x]
      })
      this.load = false
      await axios
          .get('https://rickandmortyapi.com/api/location', {
            params: {
              page: this.page,
              name: this.name,
              type: this.type,
              dimension: this.dimension
            }
          })
          .then(res => {
            this.locations = res.data.results
            this.locationsInfo = res.data.info
          })
          .catch(() => {
            this.locations = []
            this.locationsInfo = {}
          })
      this.load = true
    }
  },
  watch: {
    page: {
      async handler() {
        await this.getLocations()
      },
      deep: true
    },
    name: {
      async handler() {
        this.page = 1
        await this.getLocations()
      },
      deep: true
    },
    type: {
      async handler() {
        this.page = 1
        await this.getLocations()
      },
      deep: true
    },
    dimension: {
      async handler() {
        this.page = 1
        await this.getLocations()
      },
      deep: true
    }
  }
}
</script>
