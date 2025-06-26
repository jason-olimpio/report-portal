type AppColors = {
  primary: string;
  neutral: {
    gray: {
      100: string;
      500: string;
    };
  };
  system: {
    red: {
      50: string;
      600: string;
    };
    emerald: {
      50: string;
      600: string;
    };
    orange: {
      50: string;
      600: string;
    };
    teal: {
      50: string;
      600: string;
    };
  };
};

const appColors: AppColors = {
  primary: '#0066cc',
  neutral: {
    gray: {
      100: '#d9dadb',
      500: '#6c6f82',
    },
  },
  system: {
    red: {
      50: '#fbeff1',
      600: '#cc334d',
    },
    emerald: {
      50: '#c8f6e7',
      600: '#008055',
    },
    orange: {
      50: '#f6e4c8',
      600: '#cc7a00',
    },
    teal: {
      50: '#ccfffd',
      600: '#089994',
    },
  },
};

export default appColors;
