<script setup lang="ts">
import { IEntry } from 'src/components/models'
import { ref } from 'vue'
import { colorAndIconByEntryWeight, formatTimeStampToDate } from 'src/utils/util'

// emits
const emits = defineEmits<{
    (e: 'deleteEntry', uid: string): Promise<void>
}>()

// props
const props = defineProps<{
    entry: IEntry
}>()

// refs
const dialogEntry = ref(false)
const dialogSupprimerEntry = ref(false)

// functions
function setupSupprimerEntry() {
    dialogEntry.value = false
    dialogSupprimerEntry.value = true
}
function supprimerEntry() {
    dialogSupprimerEntry.value = false
    emits('deleteEntry', props.entry.uid)
}
</script>

<template>
    <q-dialog v-model="dialogEntry">
        <q-card class="bg-info text-white">

            <q-card-section>
            </q-card-section>

            <q-card-section class="q-pt-none q-gutter-sm">
                <ul>
                    <li> Commentaire : {{ props.entry.comment }}</li>
                    <li> Poids : {{ props.entry.weight / 10 }} kg</li>
                    <li v-if="props.entry.createdAt"> Créer le : {{ formatTimeStampToDate(props.entry.createdAt) }}</li>
                </ul>

                <div class="flex row no-wrap justify-around q-pt-xl q-gutter-sm">
                    <q-btn :to="{ name: 'editEntry', params: { entryUId: props.entry.uid } }" color="warning"
                        label="Modifier" />
                    <q-btn @click="setupSupprimerEntry" color="negative" label="Supprimer" />
                </div>
            </q-card-section>

        </q-card>
    </q-dialog>

    <q-dialog v-model="dialogSupprimerEntry">
        <q-card class="bg-info text-white">
            <q-card-section>
                <div class="text-h6 text-center">Voulez-vous vraiment supprimer cette donnée ?</div>
            </q-card-section>

            <q-card-section class="q-pt-none q-gutter-sm">
                <ul>
                    <li> Commentaire : {{ props.entry.comment }}</li>
                    <li> Poids : {{ props.entry.weight / 10 }} kg</li>
                    <li v-if="props.entry.createdAt"> Créer le : {{ formatTimeStampToDate(props.entry.createdAt) }}</li>
                </ul>

                <div class="flex row no-wrap justify-around q-pt-xl">
                    <q-btn flat color="positive" label="Annuler" v-close-popup />
                    <q-btn color="negative" filled label="Supprimer" @click="supprimerEntry" />
                </div>
            </q-card-section>

        </q-card>
    </q-dialog>

    <q-item clickable v-ripple @click="dialogEntry = true">
        <q-item-section avatar>
            <q-icon :name="colorAndIconByEntryWeight(props.entry.weight)?.icon"
                :color="colorAndIconByEntryWeight(props.entry.weight)?.color" />
        </q-item-section>

        <q-item-section>
            <q-item-label>
                {{ props.entry.weight / 10 }} kg
            </q-item-label>
        </q-item-section>

        <q-item-section caption>
            <q-item-label>
                {{ formatTimeStampToDate(props.entry.createdAt) }}
            </q-item-label>
        </q-item-section>

    </q-item>
</template>
