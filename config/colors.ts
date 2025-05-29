type AppColors = {
  primary: string;
  neutral: {
    gray: {
      100: string;
      500: string;
    };
  };
  utility: {
    blue: {
      50: string;
      600: string;
    };
    green: {
      50: string;
    };
    yellow: {
      50: string;
      600: string;
    };
    purple: {
      50: string;
      600: string;
    };
  };
};

const appColors: AppColors = {
  primary: '#16a34a',
  neutral: {
    gray: {
      100: '#E5E7EB',
      500: '#7d8390',
    },
  },
  utility: {
    blue: {
      50: '#eff6ff',
      600: '#2563eb',
    },
    green: {
      50: '#f0fdf4',
    },
    yellow: {
      50: '#fefce8',
      600: '#d97706',
    },
    purple: {
      50: '#f5f3ff',
      600: '#7c3aed',
    },
  },
};

export default appColors;
