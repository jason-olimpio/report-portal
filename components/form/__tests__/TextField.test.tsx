import {render, fireEvent} from '@testing-library/react-native';

import {TextField} from '@components';

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

describe('TextField', () => {
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChangeText: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const {getByText, getByDisplayValue} = render(<TextField {...defaultProps} />);
    
    expect(getByText('Test Label')).toBeTruthy();
    expect(getByDisplayValue('')).toBeTruthy();
  });

  it('should display the provided label', () => {
    const {getByText} = render(<TextField {...defaultProps} label="Custom Label" />);
    
    expect(getByText('Custom Label')).toBeTruthy();
  });

  it('should display the provided value', () => {
    const {getByDisplayValue} = render(<TextField {...defaultProps} value="Test Value" />);
    
    expect(getByDisplayValue('Test Value')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const {getByDisplayValue} = render(
      <TextField {...defaultProps} onChangeText={mockOnChangeText} />
    );
    
    const textInput = getByDisplayValue('');
    fireEvent.changeText(textInput, 'new text');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('should display error message when error is provided', () => {
    const {getByText} = render(<TextField {...defaultProps} error="Error message" />);
    
    expect(getByText('Error message')).toBeTruthy();
  });

  it('should not display error message when error is false', () => {
    const {queryByText} = render(<TextField {...defaultProps} error={false} />);
    
    // Since error is false, no error message should be displayed
    expect(queryByText('Error message')).toBeFalsy();
  });

  it('should pass through additional TextInput props', () => {
    const {getByDisplayValue} = render(
      <TextField 
        {...defaultProps} 
        placeholder="Test placeholder"
        multiline={true}
      />
    );
    
    const textInput = getByDisplayValue('');
    
    expect(textInput.props.placeholder).toBe('Test placeholder');
    expect(textInput.props.multiline).toBe(true);
  });
});
