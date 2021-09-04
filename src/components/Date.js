import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const FormatDate = (date, pattern) => format(date, pattern, { locale: ptBR })