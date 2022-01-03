<template>
  <v-form>
    <v-container>
      <v-row>
        <v-btn v-if="!isopen" @click="()=>{isopen=!isopen}">
          Фильтрация
          <v-icon right>
            mdi-filter
          </v-icon>
        </v-btn>
        <template v-else>
          <v-col
              cols="12"
              class="px-0"
          >
            <v-text-field
                v-model="nameValue"
                outlined
                dense
                label="Name"
                hide-details="auto"
                clearable
                clear-icon="mdi-close-circle"
                :color="$vuetify.theme.dark?'white':'black'"
            >
              <v-icon
                  slot="append"
              >
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-col>
          <v-col
              cols="12"
              sm="4"
              class="px-0 pr-sm-3"
          >
            <v-autocomplete
                v-model="statusValue"
                :items="status"
                outlined
                dense
                label="Status"
                hide-details="auto"
                clearable
                clear-icon="mdi-close-circle"
                :color="$vuetify.theme.dark?'white':'black'"
            ></v-autocomplete>
          </v-col>
          <v-col
              cols="12"
              sm="4"
              class="px-0 px-sm-3"
          >
            <v-autocomplete
                v-model="genderValue"
                :items="gender"
                outlined
                dense
                label="Gender"
                hide-details="auto"
                clearable
                clear-icon="mdi-close-circle"
                :color="$vuetify.theme.dark?'white':'black'"
            ></v-autocomplete>
          </v-col>
          <v-col
              cols="12"
              sm="4"
              class="px-0 pl-sm-3"
          >
            <v-autocomplete
                v-model="speciesValue"
                :items="species"
                outlined
                dense
                label="Species"
                hide-details="auto"
                clearable
                clear-icon="mdi-close-circle"
                :color="$vuetify.theme.dark?'white':'black'"
            ></v-autocomplete>
          </v-col>

          <v-col
              cols="3"
              sm="4"
              class="px-0 pr-3"
          >
            <v-btn width="100%" @click="change">
              <v-icon v-if="$vuetify.breakpoint.xs"> mdi-check</v-icon>
              {{ $vuetify.breakpoint.xs ? '' : 'Применить' }}
            </v-btn>
          </v-col>
          <v-col
              cols="6"
              sm="4"
              class="px-0 px-3"
          >
            <v-btn width="100%" @click="clear">Сбросить все</v-btn>
          </v-col>
          <v-col
              cols="3"
              sm="4"
              class="px-0 pl-3"
          >
            <v-btn width="100%" @click="()=>{isopen=!isopen}">
              <v-icon v-if="$vuetify.breakpoint.xs"> mdi-close</v-icon>
              {{ $vuetify.breakpoint.xs ? '' : 'Закрыть' }}
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: function () {
    return {
      status: ['alive', 'dead', 'unknown'],
      gender: ['female', 'male', 'genderless', 'unknown'],
      species: ['Human', 'Alien', 'Robot', 'Humanoid', 'Animal'],
      statusValue: null,
      genderValue: null,
      speciesValue: null,
      nameValue: null,
      isopen: false
    }
  },
  mounted() {
    this.update()
  },
  watch: {
    $route() {
      this.update()
    }
  },
  methods: {
    update() {
      this.statusValue = this.$route.query.status || null
      this.genderValue = this.$route.query.gender || null
      this.speciesValue = this.$route.query.species || null
      this.nameValue = this.$route.query.name || null
    },
    clear() {
      this.statusValue = null
      this.genderValue = null
      this.nameValue = null
      this.speciesValue = null
      this.change()
    },
    change() {
      this.$router
          .push({
            query: {
              ...this.$route.query,
              page: 1,
              status: this.statusValue || undefined,
              gender: this.genderValue || undefined,
              name: this.nameValue || undefined,
              species: this.speciesValue || undefined
            }
          })
          .catch(() => {
          });
      this.$emit('change', {
        status: this.statusValue,
        gender: this.genderValue,
        species: this.speciesValue,
        name: this.nameValue,
        page: 1
      })
    }
  }
}
</script>