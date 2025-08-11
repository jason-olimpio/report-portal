/**
 * DateRange.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definition for date range data structure.
 * Used for filtering reports by date range with optional start and end dates.
 */

type DateRange = {
  start: Date | null
  end: Date | null
}

export default DateRange
