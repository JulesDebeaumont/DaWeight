<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar';
import { deleteEntries, checkIfFileExists, ENTRIES_FILE_NAME } from 'src/utils/fileManager'

// const
const $q = useQuasar()

// refs
const peutReinitialiser = ref(false)

// functions
async function reiniDonnees() {
  try {
    await deleteEntries()
    const fichierExiste = await checkIfFileExists(ENTRIES_FILE_NAME)
    peutReinitialiser.value = fichierExiste
    $q.notify({
      color: 'primary',
      message: 'Données réinitialisées'
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Une erreur est survenue'
    })
  }
}

// lifeCycle
onMounted(async () => {
  const fichierExiste = await checkIfFileExists(ENTRIES_FILE_NAME)
  peutReinitialiser.value = fichierExiste
})
</script>

<template>
  <q-page class="column">
    <div class="q-pa-md text-center">
      <div class="text-h6">
        Paramètres
      </div>

      <div class="q-pt-md column flex">
        <q-btn icon="restart_all" color="primary" :disabled="peutReinitialiser === false" label="Réinitialiser les données"
          @click="reiniDonnees" />
      </div>
    </div>
  </q-page>
</template>
