import {ReactNode} from 'react'

import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown'

import {ThemeProvider, AuthProvider, ReportProvider} from '@contexts'

type AppProvidersProps = {
  children: ReactNode
}

const AppProviders = ({children}: AppProvidersProps) => (
  <AuthProvider>
    <ThemeProvider>
      <ReportProvider>
        <AutocompleteDropdownContextProvider>
          {children}
        </AutocompleteDropdownContextProvider>
      </ReportProvider>
    </ThemeProvider>
  </AuthProvider>
)

export default AppProviders
