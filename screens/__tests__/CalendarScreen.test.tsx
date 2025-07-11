import {render} from '@testing-library/react-native';
import {useTranslation} from 'react-i18next';

jest.mock('../report', () => ({
  NewReportScreen: () => null,
  ReportDetailsScreen: () => null,
  ReportsScreen: () => null,
}));

import {CalendarScreen} from '@screens';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useTheme: jest.fn(() => ({isDark: false})),
  useCalendar: jest.fn(() => ({
    selectedDate: '2025-07-11',
    selectedReports: [],
    markedDates: {},
    handleDayPress: jest.fn(),
    configureCalendarLocale: jest.fn(),
  })),
}));

jest.mock('@components', () => ({
  BackButton: jest.fn(() => null),
  CalendarReportsList: jest.fn(() => null),
}));

jest.mock('react-native-calendars', () => ({
  Calendar: jest.fn(() => null),
}));

jest.mock('@utils', () => ({
  getCalendarTheme: jest.fn(() => ({})),
}));

describe('CalendarScreen', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it('should render without crashing', () => {
    const component = render(<CalendarScreen />);

    expect(component).toBeTruthy();
  });

  it('should render BackButton component', () => {
    const {BackButton} = require('@components');
    render(<CalendarScreen />);

    expect(BackButton).toHaveBeenCalled();
  });

  it('should render Calendar component', () => {
    const {Calendar} = require('react-native-calendars');
    render(<CalendarScreen />);

    expect(Calendar).toHaveBeenCalled();
  });

  it('should render CalendarReportsList component', () => {
    const {CalendarReportsList} = require('@components');
    render(<CalendarScreen />);

    expect(CalendarReportsList).toHaveBeenCalled();
  });

  it('should call useTheme hook', () => {
    const {useTheme} = require('@hooks');
    render(<CalendarScreen />);

    expect(useTheme).toHaveBeenCalled();
  });

  it('should call useCalendar hook with translation function and theme', () => {
    const {useCalendar} = require('@hooks');
    render(<CalendarScreen />);

    expect(useCalendar).toHaveBeenCalledWith(expect.any(Function), false);
  });

  it('should call getCalendarTheme with theme preference', () => {
    const {getCalendarTheme} = require('@utils');
    render(<CalendarScreen />);

    expect(getCalendarTheme).toHaveBeenCalledWith(false);
  });

  it('should configure calendar locale on mount', () => {
    const mockConfigureCalendarLocale = jest.fn();
    const {useCalendar} = require('@hooks');

    (useCalendar as jest.Mock).mockReturnValue({
      selectedDate: '2025-07-11',
      selectedReports: [],
      markedDates: {},
      handleDayPress: jest.fn(),
      configureCalendarLocale: mockConfigureCalendarLocale,
    });

    render(<CalendarScreen />);

    expect(mockConfigureCalendarLocale).toHaveBeenCalled();
  });
});
