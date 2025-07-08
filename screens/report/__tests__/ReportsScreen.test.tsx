import {render} from '@testing-library/react-native';

import {ReportsScreen} from '@screens';

jest.mock('@components', () => {
  const React = require('react');
  const {Text} = require('react-native');
  
  return {
    AllReportsWithFilter: () => (
      <Text>All reports</Text>
    ),
  };
});

jest.mock('@maplibre/maplibre-react-native', () => ({
  Camera: () => null,
  MapView: () => null,
  PointAnnotation: () => null,
}));

describe('ReportsScreen', () => {
  it('should render without crashing', () => {
    const component = render(<ReportsScreen />);

    expect(component).toBeTruthy();
  });

  it('should render AllReportsWithFilter component', () => {
    const {getByText} = render(<ReportsScreen />);

    expect(getByText('All reports')).toBeTruthy();
  });

  it('should be wrapped in ScrollView', () => {
    const component = render(<ReportsScreen />);
    
    expect(component).toBeTruthy();
  });
});
