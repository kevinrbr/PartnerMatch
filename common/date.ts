import { format, parseISO } from 'date-fns'

export const getDateHours = (date: string) => {
  const parsedDate = parseISO(date)
  const formattedDate = format(parsedDate, 'HH:mm')
  return formattedDate.replace(/:/g, 'h')
}

export const formatDateDDYY = (date: string) => {
  const parsedDate = parseISO(date)
  const formattedDate = format(parsedDate, 'dd/MM')
  return formattedDate
}
