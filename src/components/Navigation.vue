<template>
  <v-card class="elevation-0">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Rick and Morty
        </v-list-item-title>
        <v-list-item-subtitle>
          all about it
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
        dense
        nav
    >
      <v-list-item v-for="item in links"
                   :key="item.title"
                   link :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['links'],
  data() {
    return {
      right: true,
    }
  },
}
</script>