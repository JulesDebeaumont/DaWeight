<script setup lang="ts">
import { IEntry } from 'src/components/models'
// components
import EntryItem from 'src/components/entry/EntryItem.vue'

// emits
const emits = defineEmits<{
    (e: 'deleteEntry', uid: string): Promise<void>
}>()

// props
const props = defineProps<{
    entries: IEntry[]
}>()
</script>

<template>
    <q-list bordered separator class="bg-info shadow-5 q-pa-sm rounded-borders">
        <template v-for="entry in props.entries" :key="entry.id">
            <EntryItem :entry="entry" @deleteEntry="(uid: string) => emits('deleteEntry', uid)" />
        </template>
    </q-list>
</template>
