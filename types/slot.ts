export interface ISlot {
  city: string
  club: string
  nbPlaces: string
  level: string
  date: Date
  name?: string
}

export enum ESlot {
  CITY = 'city',
  CLUB = 'club',
  NUMBER_PLACES = 'nbPlaces',
  LEVEL = 'level',
  DATE = 'date'
}

export const ERROR_MESSAGES = {
  CITY: 'Caractères autorisés : A-Z et -',
  CLUB: 'Caractères autorisés : A-Z et -',
  NUMBER_PLACES: '1 à 3 places maximum',
  LEVEL: 'Niveau 1 à 10 uniquement'
}
