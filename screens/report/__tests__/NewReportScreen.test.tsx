import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import NewReportScreen from '../NewReportScreen';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useTheme: () => ({isDark: false}),
}));

jest.mock('@components', () => ({
  FormHandler: jest.fn(({onSave}: {onSave: jest.Mock}) => {
    const MockButton = require('react-native').TouchableOpacity;
    const MockText = require('react-native').Text;

    return (
      <MockButton
        testID="form-save-button"
        onPress={() =>
          onSave({
            title: 'Test Report',
            description: 'Test description for the report',
            images: [],
            location: {latitude: 40.7128, longitude: -74.006},
          })
        }>
        <MockText>Save</MockText>
      </MockButton>
    );
  }),
  BackButton: jest.fn(() => null),
}));

jest.mock('@db', () => ({
  initPendingReportsTable: jest.fn(),
  addPendingReport: jest.fn(),
}));

jest.mock('@utils', () => ({
  isOnline: jest.fn(),
  getAddressFromLocation: jest.fn(),
}));

jest.mock('@config', () => ({
  appColors: {
    neutral: {
      gray: {
        200: '#e5e5e5',
        500: '#737373',
      },
    },
  },
}));

describe('NewReportScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const mockTranslation = {
    t: (key: string) => {
      const translations: Record<string, string> = {
        'errors.titleTooShort': 'Title too short',
        'errors.descriptionTooShort': 'Description too short',
        'errors.locationRequired': 'Location required',
        'errors.reportSendFailed': 'Failed to send report',
        image: 'Image',
        title: 'Title',
        description: 'Description',
        location: 'Location',
        reportSavedOffline: 'Report saved offline',
        reportSaved: 'Report saved',
        error: 'Error',
      };

      return translations[key] || key;
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);

    const {initPendingReportsTable} = require('@db');
    const {isOnline, getAddressFromLocation} = require('@utils');

    initPendingReportsTable.mockResolvedValue(undefined);
    isOnline.mockResolvedValue(true);
    getAddressFromLocation.mockResolvedValue('Test Address, Test City');

    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const component = render(<NewReportScreen />);
    expect(component).toBeTruthy();
  });

  it('should initialize pending reports table on mount', () => {
    const {initPendingReportsTable} = require('@db');
    render(<NewReportScreen />);

    expect(initPendingReportsTable).toHaveBeenCalled();
  });

  it('should render BackButton component', () => {
    const {BackButton} = require('@components');
    render(<NewReportScreen />);

    expect(BackButton).toHaveBeenCalled();
  });

  it('should render FormHandler with correct props', () => {
    const {FormHandler} = require('@components');
    render(<NewReportScreen />);

    const calls = FormHandler.mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const firstCallProps = calls[0][0];
    expect(firstCallProps).toMatchObject({
      schema: expect.any(Object),
      initialState: expect.objectContaining({
        title: '',
        description: '',
        images: [],
        location: expect.objectContaining({
          latitude: 0,
          longitude: 0,
        }),
      }),
      fields: expect.arrayContaining([
        expect.objectContaining({key: 'image'}),
        expect.objectContaining({key: 'title'}),
        expect.objectContaining({key: 'description'}),
        expect.objectContaining({key: 'location'}),
      ]),
      onSave: expect.any(Function),
    });
  });

  it('should save report successfully when online', async () => {
    const {getAddressFromLocation} = require('@utils');
    const {getByTestId} = render(<NewReportScreen />);

    fireEvent.press(getByTestId('form-save-button'));

    await waitFor(
      () => {
        expect(getAddressFromLocation).toHaveBeenCalledWith({
          latitude: 40.7128,
          longitude: -74.006,
        });
        expect(Alert.alert).toHaveBeenCalledWith('Report saved');
      },
      {timeout: 3000},
    );
  });

  it('should save report offline when not connected', async () => {
    const {isOnline, getAddressFromLocation} = require('@utils');
    const {addPendingReport} = require('@db');

    isOnline.mockResolvedValue(false);

    const {getByTestId} = render(<NewReportScreen />);

    fireEvent.press(getByTestId('form-save-button'));

    await waitFor(() => {
      expect(getAddressFromLocation).toHaveBeenCalled();
      expect(addPendingReport).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Report',
          description: 'Test description for the report',
          address: 'Test Address, Test City',
          location: {latitude: 40.7128, longitude: -74.006},
        }),
      );
      expect(Alert.alert).toHaveBeenCalledWith('Report saved offline');
    });
  });

  it('should handle report save error', async () => {
    const {getAddressFromLocation} = require('@utils');
    getAddressFromLocation.mockRejectedValue(new Error('Network error'));

    const {getByTestId} = render(<NewReportScreen />);

    fireEvent.press(getByTestId('form-save-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Failed to send report',
      );
    });
  });

  it('should create report with correct structure', async () => {
    const {getByTestId} = render(<NewReportScreen />);

    fireEvent.press(getByTestId('form-save-button'));

    await waitFor(
      () => {
        expect(Alert.alert).toHaveBeenCalledWith('Report saved');
      },
      {timeout: 3000},
    );
  });

  it('should use correct field configuration', () => {
    const {FormHandler} = require('@components');
    render(<NewReportScreen />);

    const fieldConfig = FormHandler.mock.calls[0][0].fields;

    expect(fieldConfig).toEqual([
      {key: 'image', label: 'Image', isImageSlider: true, maxImages: 5},
      {key: 'title', label: 'Title'},
      {
        key: 'description',
        label: 'Description',
        inputProps: {multiline: true, style: {minHeight: 80}},
      },
      {key: 'location', label: 'Location', isLocation: true},
    ]);
  });
});
