/**
 * ErrorText.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying error messages.
 * Shows error text with consistent styling when an error is present.
 */

import {Text} from 'react-native'

type ErrorTextProps = {
  error?: string | false
  className?: string
}

const ErrorText = ({error, className = ''}: ErrorTextProps) => {
  if (!error) return null

  return (
    <Text
      className={`font-titillium-regular text-red-500 text-sm mt-4 ${className}`.trim()}>
      {error}
    </Text>
  )
}

export default ErrorText
