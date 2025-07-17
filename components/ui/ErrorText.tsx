import {Text} from 'react-native';

type ErrorTextProps = {
  error?: string | false;
  className?: string;
};

const ErrorText = ({error, className = ''}: ErrorTextProps) => {
  if (!error) {
    return null;
  }

  return (
    <Text className={`text-red-500 text-sm mt-4 ${className}`.trim()}>
      {error}
    </Text>
  );
};

export default ErrorText;
