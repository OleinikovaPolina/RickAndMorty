<template>
  <v-form>
    <v-container>
      <v-row>
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
          ></v-autocomplete>
        </v-col>
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
      nameValue: null
    }
  },
  methods: {
    change() {
      this.$emit('change', {
        status: this.statusValue,
        gender: this.genderValue,
        species: this.speciesValue,
        name: this.nameValue
      })
    }
  },
  watch: {
    statusValue: {
      handler() {
        this.change()
      }
    },
    genderValue: {
      handler() {
        this.change()
      }
    },
    speciesValue: {
      handler() {
        this.change()
      }
    },
    nameValue: {
      handler() {
        this.change()
      }
    }
  }
}
</script>