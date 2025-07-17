const appColors: AppColors = {
  primary: {
    light: '#0066cc',
    dark: '#003366',
  },
  background: {
    light: '#f3f4f6',
    dark: '#262626',
    secondaryLight: '#ffffff',
    secondaryDark: '#1a1a1a',
  },
  text: {
    primary: {
      light: '#1f2937',
      dark: '#f1f5f9',
    },
    secondary: {
      light: '#6c6f82',
      dark: '#cbd5e1',
    },
  },
  neutral: {
    gray: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6c6f82',
      600: '#4b5563',
      700: '#23272f',
      800: '#18181b',
      900: '#111111',
    },
  },
  system: {
    red: {
      50: {
        light: '#fbeff1',
        dark: '#450a0a',
      },
      600: {
        light: '#cc334d',
        dark: '#dc2626',
      },
    },
    emerald: {
      50: {
        light: '#c8f6e7',
        dark: '#022c22',
      },
      600: {
        light: '#008055',
        dark: '#059669',
      },
    },
    orange: {
      50: {
        light: '#f6e4c8',
        dark: '#431407',
      },
      600: {
        light: '#cc7a00',
        dark: '#ea580c',
      },
    },
    teal: {
      50: {
        light: '#ccfffd',
        dark: '#134e4a',
      },
      600: {
        light: '#089994',
        dark: '#0d9488',
      },
    },
  },
};

type AppColors = {
  primary: {
    light: string;
    dark: string;
  };
  background: {
    light: string;
    dark: string;
    secondaryLight: string;
    secondaryDark: string;
  };
  text: {
    primary: {
      light: string;
      dark: string;
    };
    secondary: {
      light: string;
      dark: string;
    };
  };
  neutral: {
    gray: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  system: {
    red: {
      50: {
        light: string;
        dark: string;
      };
      600: {
        light: string;
        dark: string;
      };
    };
    emerald: {
      50: {
        light: string;
        dark: string;
      };
      600: {
        light: string;
        dark: string;
      };
    };
    orange: {
      50: {
        light: string;
        dark: string;
      };
      600: {
        light: string;
        dark: string;
      };
    };
    teal: {
      50: {
        light: string;
        dark: string;
      };
      600: {
        light: string;
        dark: string;
      };
    };
  };
};

export default appColors;
