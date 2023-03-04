<script setup lang="ts">
import { readEntries, removeEntry } from 'src/utils/fileManager'
import { IEntry } from 'src/components/models'
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import ListOfEntry from 'src/components/entry/ListOfEntry.vue'

// consts
const $q = useQuasar()

// refs
const isLoading = ref(false)
const entries = ref<IEntry[] | undefined>([])

// functions
async function getEntries() {
  isLoading.value = true
  try {
    entries.value = await readEntries()
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Une erreur est survenue'
    })
  } finally {
    isLoading.value = false
  }
}
async function deleteEntry(uid: string) {
  await removeEntry(uid)
  entries.value = entries.value?.filter((entry) => entry.uid !== uid)
  $q.notify({
    color: 'primary',
    message: 'Donnée supprimée'
  })
}

// lifeCycle
onMounted(async () => {
    getEntries()
})
</script>

<template>
  <q-page class="column">
    <div class="row justify-between q-pa-sm">
      <q-btn icon="bar_chart" round :to="{ name: 'stats'}" color="info" />
      <q-btn icon="add" round :to="{ name: 'newEntry' }" color="info" />
    </div>
    <div class="row justify-end q-pa-sm">
    </div>
    <div class="column flex justify-center q-px-sm">
      <template v-if="isLoading === false">
        <ListOfEntry v-if="entries && entries.length > 0" :entries="entries" @deleteEntry="deleteEntry" />
        <div v-else class="text-center">Aucune données</div>
      </template>
      <q-spinner v-show="isLoading === true" color="primary" size="3em" :thickness="2" />
    </div>
  </q-page>
</template>
