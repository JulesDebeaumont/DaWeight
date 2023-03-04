<script setup lang="ts">
import { ref } from 'vue';
import { IEssentialLink } from 'src/components/models'
// components
import EssentialLink from 'src/components/layout/EssentialLink.vue'

const essentialLinks: IEssentialLink[] = [
  {
    title: 'Tableau de bord',
    icon: 'dashboard',
    route: { name: 'home' }
  },
  {
    title: 'Paramètres',
    icon: 'settings',
    route: { name: 'setting' }
  },
  {
    title: 'À propos',
    icon: 'code',
    route: { name: 'about' }
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-info">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          DaWeight
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered dark>
      <q-list class="bg-info">
        <q-item-label header>
          DaWeight
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" :essentialLink="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="bg-dark text-white" />
    </q-page-container>
  </q-layout>
</template>
