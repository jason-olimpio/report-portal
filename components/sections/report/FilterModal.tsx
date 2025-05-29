const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedStatus,
  onSelectStatus,
  dateRange,
  onDateRangeChange,
  onResetFilter,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const getDateRangeText = () => {
    return dateRange.start && dateRange.end
      ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
      : 'Seleziona intervallo date';
  };

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    setTempDateRange(prev => ({
      ...prev,
      start: type === 'START_DATE' ? date : prev.start,
      end: type === 'START_DATE' ? null : date,
    }));
  };

  const confirmDateRange = () => {
    onDateRangeChange(tempDateRange);
    setShowDatePicker(false);
  };

  const resetDateRange = () => {
    onDateRangeChange({ start: null, end: null });
    setTempDateRange({ start: null, end: null });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 bg-black/40 justify-center px-8"
        onPress={onClose}>
        <Pressable
          className="bg-white rounded-xl p-6 shadow-lg"
          onPress={event => event.stopPropagation()}>
          {!showDatePicker ? (
            <FilterSection
              selectedStatus={selectedStatus}
              onSelectStatus={onSelectStatus}
              getDateRangeText={getDateRangeText}
              onResetDateRange={resetDateRange}
              onResetFilter={onResetFilter}
              onClose={onClose}
            />
          ) : (
            <DatePickerSection
              tempDateRange={tempDateRange}
              handleDateChange={handleDateChange}
              confirmDateRange={confirmDateRange}
              setShowDatePicker={setShowDatePicker}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};