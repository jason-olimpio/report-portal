import {type Report, StatusOption} from '@types'

type MonthlyStats = {
  open: number
  closed: number
}

type MonthlyReportStatsResult = {
  [K in keyof MonthlyStats]: MonthlyStats[K][]
} & {
  months: (number | undefined)[]
}

const getMonthlyReportStats = (reports: Report[]): MonthlyReportStatsResult => {
  const stats = new Map<string, MonthlyStats>()

  for (const report of reports) {
    const date = new Date(report.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!stats.has(key)) stats.set(key, {open: 0, closed: 0})

    const entry: MonthlyStats | undefined = stats.get(key)

    if (!entry) continue

    const isClosed: boolean = report.status === StatusOption.Completed
    const isOpen: boolean =
      report.status === StatusOption.Pending ||
      report.status === StatusOption.Working

    entry.closed += Number(isClosed)
    entry.open += Number(isOpen)
  }

  const sortedKeys: string[] = Array.from(stats.keys()).sort()

  const months: (number | undefined)[] = sortedKeys.map((key: string) => {
    const parts: string[] = key.split('-')

    return parts.length > 1 ? parseInt(parts[1], 10) : undefined
  })

  return {
    open: sortedKeys.map((key: string) => stats.get(key)?.open ?? 0),
    closed: sortedKeys.map((key: string) => stats.get(key)?.closed ?? 0),
    months,
  }
}

export default getMonthlyReportStats
