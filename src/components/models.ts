export interface IEssentialLink {
  title: string
  caption?: string
  route?: { name: string, params?: { [paramsName: string]: string | number } }
  icon?: string
}
export interface IEntry {
  uid: string
  comment?: string
  weight: number
  createdAt: Date
  updatedAt?: Date
}
export interface IWeightWindow {
  weightMinInHectogram?: number
  color: string
  icon: string
}
