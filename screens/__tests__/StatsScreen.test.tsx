import {render} from '@testing-library/react-native';
import {useTranslation} from 'react-i18next';

import {StatsScreen} from '@screens';
import {ThemeProvider} from '@contexts';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-native-chart-kit', () => ({
  LineChart: 'LineChart',
  BarChart: 'BarChart',
}));

jest.mock('@store', () => ({
  reportData: [
    {
      id: '1',
      title: 'Test Report',
      description: 'Test Description',
      date: new Date('2023-01-01'),
      status: 'pending',
    },
    {
      id: '2',
      title: 'Another Report',
      description: 'Another Description',
      date: new Date('2023-01-02'),
      status: 'resolved',
    },
  ],
}));

jest.mock('@utils', () => ({
  getMonthlyReportStats: jest.fn(() => ({
    open: [5, 8, 3],
    closed: [2, 4, 1],
    months: [1, 2, 3],
  })),

  getMonthLabel: jest.fn(month => `Month${month}`),
}));

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: () => null,
  MapView: () => null,
  PointAnnotation: () => null,
}));

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

const mockTranslation = {
  t: jest.fn((key: string) => key),
  i18n: {
    language: 'en',
  },
};

describe('StatsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render without crashing', () => {
    const {getByText} = render(
      <ThemeProvider>
        <StatsScreen />
      </ThemeProvider>,
    );
    expect(getByText('statsByMonth')).toBeTruthy();
  });

  it('should call useTranslation hook', () => {
    render(
      <ThemeProvider>
        <StatsScreen />
      </ThemeProvider>,
    );

    expect(useTranslation).toHaveBeenCalled();
  });

  it('should display stats content', () => {
    const component = render(
      <ThemeProvider>
        <StatsScreen />
      </ThemeProvider>,
    );
    expect(component).toBeTruthy();
  });
});
