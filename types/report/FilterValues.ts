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
