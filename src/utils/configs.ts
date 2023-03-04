import { IWeightWindow } from 'src/components/models'

export const COLOR_AND_ICON_BY_WEIGHT_WINDOW: IWeightWindow[] = [{
        weightMinInHectogram: 850, // TODO J'en suis loin, changer ca
        color: 'negative',
        icon: 'thumb_down'
    },
    {
        weightMinInHectogram: 845, // TODO J'en suis loin, changer ca
        color: 'orange',
        icon: 'thumb_down'
    },
    {
        weightMinInHectogram: 840, // TODO J'en suis loin, changer ca
        color: 'warning',
        icon: 'help'
    },
    {
        color: 'positive',
        icon: 'thumb_up'
    }
]
