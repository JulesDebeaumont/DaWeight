import { COLOR_AND_ICON_BY_WEIGHT_WINDOW } from 'src/utils/configs'
import { date } from 'quasar'

export function colorAndIconByEntryWeight(timestampRemainingTime: number) {
    for(const weightWindow of COLOR_AND_ICON_BY_WEIGHT_WINDOW) {
        if (timestampRemainingTime >= (weightWindow.weightMinInHectogram ?? 0)) {
            return weightWindow
        }
    }
    return COLOR_AND_ICON_BY_WEIGHT_WINDOW.at(-1)
}
export function formatTimeStampToDate(dateArg: Date) {
    return date.formatDate(dateArg, 'DD-MM-YYYY')
}
