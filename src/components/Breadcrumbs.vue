<template>
  <v-breadcrumbs :items="items" class="px-0" divider="-">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
      ><span :style="`color: ${!item.disabled? $vuetify.theme.dark?'white':'black':''}`">
        {{ item.text }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ['items']
}
</script>