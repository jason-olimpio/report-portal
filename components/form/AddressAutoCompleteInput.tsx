import {Text, View, StyleSheet} from 'react-native'
import {useRef} from 'react'
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown'
import {useTranslation} from 'react-i18next'

import {appColors} from '@config'
import {useTheme} from '@hooks'

type AddressAutocompleteInputProps = {
  value: string
  onValueChange: (text: string) => void
  data: string[]
}

const AddressAutocompleteInput = ({
  value,
  onValueChange,
  data,
}: AddressAutocompleteInputProps) => {
  const {t} = useTranslation()
  const {isDark} = useTheme()
  const dropdownController = useRef(null)

  const styles = StyleSheet.create({
    inputContainer: {
      borderWidth: 0,
      borderColor: isDark
        ? appColors.neutral.gray[700]
        : appColors.neutral.gray[100],
      backgroundColor: isDark
        ? appColors.background.secondaryDark
        : appColors.background.secondaryLight,
      borderRadius: 20,
      padding: 8,
    },
    suggestionsList: {
      backgroundColor: isDark
        ? appColors.background.secondaryDark
        : appColors.background.secondaryLight,
      borderRadius: 10,
    },
  })

  const dropdownData: AutocompleteDropdownItem[] = data.map(item => ({
    id: item,
    title: item,
  }))

  const handleSelectItem = (item: AutocompleteDropdownItem | null) => {
    if (item) onValueChange(item.title || '')
  }

  const handleChangeText = (text: string) => onValueChange(text)

  const filteredDropdownData = value
    ? dropdownData.filter(item =>
        item.title?.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      )
    : dropdownData

  return (
    <AutocompleteDropdown
      ref={dropdownController}
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      initialValue={{id: value, title: value}}
      onSelectItem={handleSelectItem}
      dataSet={filteredDropdownData}
      onChangeText={handleChangeText}
      suggestionsListMaxHeight={150}
      suggestionsListContainerStyle={styles.suggestionsList}
      EmptyResultComponent={
        <Text className="p-5 font-titillium-regular text-neutral-400 dark:text-neutral-500">
          {t('reports.noResults')}
        </Text>
      }
      inputContainerStyle={styles.inputContainer}
      textInputProps={{
        placeholder: t('reports.resendReport'),
        placeholderTextColor: isDark
          ? appColors.neutral.gray[300]
          : appColors.neutral.gray[500],
        value,
      }}
      renderItem={({id, title}) => (
        <View key={id} className="p-5">
          <Text className="text-text-primary-light dark:text-text-primary-dark font-titillium-regular text-lg">
            {title}
          </Text>
        </View>
      )}
      showClear={!!value}
      onClear={() => onValueChange('')}
    />
  )
}

export default AddressAutocompleteInput
