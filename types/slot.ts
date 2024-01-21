export interface ISlot {
  city: string
  club: string
  nbPlaces: string
  level: string
  date: Date
}

export enum ESlot {
  CITY = 'city',
  CLUB = 'club',
  NUMBER_PLACES = 'nbPlaces',
  LEVEL = 'level',
  DATE = 'date'
}
