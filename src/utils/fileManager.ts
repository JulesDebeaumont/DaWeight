import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
import { IEntry } from 'src/components/models'

const { Filesystem } = Plugins
const DIRECTORY_FOR_FILE = FilesystemDirectory.Data
const ENCODING = FilesystemEncoding.UTF8
export const ENTRIES_FILE_NAME = 'da_weight_entries.json'

export async function checkIfFileExists(filename: string) {
    try {
        await Filesystem.stat({
            path: filename,
            directory: DIRECTORY_FOR_FILE
        })
        return true
    } catch (error: any) {
        if (error.message === 'File does not exist') {
            return false
        } else {
            throw error
        }
    }
}
export async function readEntries(): Promise<IEntry[] | undefined> {
    const fileExists = await checkIfFileExists(ENTRIES_FILE_NAME)
    if (fileExists) {
        const fileData = await Filesystem.readFile({
            path: ENTRIES_FILE_NAME,
            directory: DIRECTORY_FOR_FILE,
            encoding: ENCODING
        })
        if (fileData.data) {
            return JSON.parse(fileData.data)
        } else {
            return []
        }
    } else {
        await writeEntries([])
        await readEntries()
    }
}
export async function writeEntries(entries: IEntry[]) {
    await Filesystem.writeFile({
        path: ENTRIES_FILE_NAME,
        data: JSON.stringify(entries),
        directory: DIRECTORY_FOR_FILE,
        encoding: ENCODING,
    })
}
export async function deleteEntries() {
    await Filesystem.deleteFile({
        path: ENTRIES_FILE_NAME,
        directory: DIRECTORY_FOR_FILE
    })
}
export async function getEntryByUid(entryUid: string) {
    const entries = await readEntries()
    return entries?.find((entryA) => entryA.uid === entryUid) ?? null
}
export async function injectEntry(newEntry: IEntry) {
    const entries = await readEntries()
    if (!entries) {
        return
    }
    const filteredEntries = entries.filter((entry) => entry.uid !== newEntry.uid)
    if (!newEntry.createdAt) {
        newEntry.createdAt = new Date(Date.now())
    }
    newEntry.updatedAt = new Date(Date.now())
    filteredEntries.push(newEntry)
    await writeEntries(filteredEntries)
}
export async function removeEntry(entryUId: string) {
    const entries = await readEntries()
    if (!entries) {
        return
    }
    const filteredEntries = entries.filter((entry) => entry.uid !== entryUId)
    await writeEntries(filteredEntries)
}