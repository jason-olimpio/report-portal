import type {Report} from '@types';

export type ReportsByDate = Record<string, Report[]>;

export type MarkedDates = Record<
  string,
  {
    dots?: Array<{
      key: string;
      color: string;
    }>;
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  }
>;

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold'
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium';

export type CalendarTheme = {
  backgroundColor: string;
  calendarBackground: string;
  textSectionTitleColor: string;
  dayTextColor: string;
  todayTextColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
  textDayFontWeight: FontWeight;
  textMonthFontWeight: FontWeight;
  textDayHeaderFontWeight: FontWeight;
  textDayFontSize: number;
  textMonthFontSize: number;
  textDayHeaderFontSize: number;
  monthTextColor: string;
  arrowColor: string;
};
