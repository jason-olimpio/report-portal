type AppColors = {
  primary: {light: string; dark: string}
  background: {
    light: string
    dark: string
    secondaryLight: string
    secondaryDark: string
  }
  text: {
    primary: {light: string; dark: string}
    secondary: {light: string; dark: string}
  }
  neutral: {
    gray: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
  system: {
    red: {50: {light: string; dark: string}; 600: {light: string; dark: string}}
    emerald: {
      50: {light: string; dark: string}
      600: {light: string; dark: string}
    }
    orange: {
      50: {light: string; dark: string}
      600: {light: string; dark: string}
    }
    teal: {
      50: {light: string; dark: string}
      600: {light: string; dark: string}
    }
  }
}

const appColors: AppColors = {
  primary: {
    light: '#7c3aed',
    dark: '#8b5cf6',
  },
  background: {
    light: '#ffffff',
    dark: '#09090b',
    secondaryLight: '#f4f4f5',
    secondaryDark: '#18181b',
  },
  text: {
    primary: {
      light: '#09090b',
      dark: '#fafafa',
    },
    secondary: {
      light: '#71717a',
      dark: '#a1a1aa',
    },
  },
  neutral: {
    gray: {
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
  },
  system: {
    red: {
      50: {light: '#fef2f2', dark: '#450a0a'},
      600: {light: '#dc2626', dark: '#ef4444'},
    },
    emerald: {
      50: {light: '#ecfdf5', dark: '#064e3b'},
      600: {light: '#059669', dark: '#10b981'},
    },
    orange: {
      50: {light: '#fff7ed', dark: '#7c2d12'},
      600: {light: '#ea580c', dark: '#f59e0b'},
    },
    teal: {
      50: {light: '#f0fdfa', dark: '#134e4a'},
      600: {light: '#0d9488', dark: '#14b8a6'},
    },
  },
}

export default appColors
