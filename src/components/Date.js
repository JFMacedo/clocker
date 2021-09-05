import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function FormatDate(date, pattern) {
  return format(date, pattern, { locale: ptBR })
}