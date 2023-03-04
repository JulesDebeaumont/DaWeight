<script setup lang="ts">
import { getEntryByUid, injectEntry } from 'src/utils/fileManager'
import { IEntry } from 'src/components/models'
import { ref, onMounted } from 'vue'
import { useQuasar, uid } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

// consts
const DEFAULT_ENTRY_VALUE: IEntry = {
  uid: uid(),
  comment: '',
  weight: 0,
  createdAt: new Date()
} as const
const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const entryUid = (route.params.entryUId as string ?? undefined)

// refs
const isLoading = ref(false)
const entry = ref<IEntry | null>(null)
const entryCopy = ref<IEntry | null>(null)

// functions
function onReset() {
  if (entryUid !== undefined) {
    entry.value = JSON.parse(JSON.stringify(entryCopy.value))
  } else {
    entry.value = JSON.parse(JSON.stringify(DEFAULT_ENTRY_VALUE))
  }
}
async function onSubmit() {
  if (entry.value !== null) {
    isLoading.value = true
    try {
      await injectEntry(entry.value)
      $q.notify({
        color: 'primary',
        message: 'Donnée enregistrée',
      })
      router.push({ name: 'home' })
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
}

// lifeCycle
onMounted(async () => {
  if (entryUid) {
    isLoading.value = true
    try {
      entry.value = await getEntryByUid(entryUid)
      if (entry.value !== null) {
        entryCopy.value = JSON.parse(JSON.stringify(entry.value))
      }
    } catch (error) {
      console.error(error)
      $q.notify({
        type: 'negative',
        message: 'Une erreur est survenue'
      })
    } finally {
      isLoading.value = false
    }
  } else {
    entry.value = JSON.parse(JSON.stringify(DEFAULT_ENTRY_VALUE))
  }
})
</script>

<template>
  <q-page class="column">
    <q-form v-if="entry !== null" class="col flex column justify-between q-px-md q-py-lg" @submit="onSubmit"
      @reset="onReset">

      <div class="q-gutter-md">
        <q-input color="primary" dark filled v-model="entry.comment" label="Commentaire" autogrow />
          <q-input color="primary" required type="number" dark filled v-model="entry.weight" label="Poids"  lazy-rules
          :rules="[val => val && val > 0 || 'Ce champ est requis']" hide-bottom-space />
      </div>

      <div class="flex justify-between no-wrap">
        <q-btn label="Enregistrer" type="submit" color="primary" />
        <q-btn label="RÀZ" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

    </q-form>
  </q-page>
</template>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
