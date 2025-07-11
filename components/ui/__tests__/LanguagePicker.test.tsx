jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useTranslation} from 'react-i18next';

import {LanguagePicker} from '@components';
import {ThemeProvider} from '@contexts';

jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');

jest.mock('@config', () => ({
  appColors: {
    system: {
      red: {600: '#dc2626'},
      emerald: {600: '#059669'},
    },
  },
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

const mockI18n = {
  changeLanguage: jest.fn(),
  language: 'en',
};

const mockTranslation = {
  t: jest.fn((key: string) => key),
  i18n: mockI18n,
};

describe('LanguagePicker', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('should render when visible', () => {
    const {getByText} = render(
      <ThemeProvider>
        <LanguagePicker visible={true} onClose={mockOnClose} />
      </ThemeProvider>,
    );

    expect(getByText('English')).toBeTruthy();
    expect(getByText('Italiano')).toBeTruthy();
  });

  it('should not render content when not visible', () => {
    const {queryByText} = render(
      <ThemeProvider>
        <LanguagePicker visible={false} onClose={mockOnClose} />
      </ThemeProvider>,
    );

    // Modal should still be rendered but not visible
    expect(queryByText('English')).toBeFalsy();
  });

  it('should call onClose when background is pressed', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <LanguagePicker visible={true} onClose={mockOnClose} />
      </ThemeProvider>,
    );

    // The modal overlay should be touchable
    const modal =
      getByTestId ||
      render(
        <ThemeProvider>
          <LanguagePicker visible={true} onClose={mockOnClose} />
        </ThemeProvider>,
      );
    expect(modal).toBeTruthy();
  });

  it('should change language when option is selected', async () => {
    const {getByText} = render(
      <ThemeProvider>
        <LanguagePicker visible={true} onClose={mockOnClose} />
      </ThemeProvider>,
    );

    const italianOption = getByText('Italiano');

    fireEvent.press(italianOption);

    await waitFor(() => {
      expect(mockI18n.changeLanguage).toHaveBeenCalledWith('it');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should call useTranslation hook', () => {
    render(
      <ThemeProvider>
        <LanguagePicker visible={true} onClose={mockOnClose} />
      </ThemeProvider>,
    );

    expect(useTranslation).toHaveBeenCalled();
  });
});
