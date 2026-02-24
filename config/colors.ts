type AppColors = {
  primary: {
    light: string
    dark: string
  }
  background: {
    light: string
    dark: string
    secondaryLight: string
    secondaryDark: string
  }
  text: {
    primary: {
      light: string
      dark: string
    }
    secondary: {
      light: string
      dark: string
    }
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
    red: {
      50: {
        light: string
        dark: string
      }
      600: {
        light: string
        dark: string
      }
    }
    emerald: {
      50: {
        light: string
        dark: string
      }
      600: {
        light: string
        dark: string
      }
    }
    orange: {
      50: {
        light: string
        dark: string
      }
      600: {
        light: string
        dark: string
      }
    }
    teal: {
      50: {
        light: string
        dark: string
      }
      600: {
        light: string
        dark: string
      }
    }
  }
}

const appColors: AppColors = {
  primary: {
    light: '#7c3aed',
    dark: '#a78bfa',
  },
  background: {
    light: '#fafaf9',
    dark: '#0c0a09',
    secondaryLight: '#f5f5f4',
    secondaryDark: '#1c1917',
  },
  text: {
    primary: {
      light: '#1c1917',
      dark: '#fafaf9',
    },
    secondary: {
      light: '#57534e',
      dark: '#d6d3d1',
    },
  },
  neutral: {
    gray: {
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
  },
  system: {
    red: {
      50: {light: '#fff1f2', dark: '#4c0519'},
      600: {light: '#e11d48', dark: '#fb7185'},
    },
    emerald: {
      50: {light: '#ecfdf5', dark: '#022c22'},
      600: {light: '#059669', dark: '#34d399'},
    },
    orange: {
      50: {light: '#fffbeb', dark: '#451a03'},
      600: {light: '#d97706', dark: '#fbbf24'},
    },
    teal: {
      50: {light: '#f0fdfa', dark: '#042f2e'},
      600: {light: '#0d9488', dark: '#2dd4bf'},
    },
  },
}

export default appColors
