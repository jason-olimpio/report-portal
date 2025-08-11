/**
 * FilterValues.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definition for report filter values.
 */

import DateRange from './DateRange'
import PriorityOption from './PriorityOption'
import StatusOption from './StatusOption'

type FilterValues = {
  selectedStatus: StatusOption
  setSelectedStatus: (status: StatusOption) => void
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  selectedPriority?: PriorityOption
  setSelectedPriority?: (priority: PriorityOption) => void
}

export default FilterValues
