/**
 * StatusDropdownMenu.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Dropdown component for selecting report status options.
 * Integrates with DropdownItem for rendering options.
 */

import {useTranslation} from 'react-i18next'
import {StyleSheet} from 'react-native'
import {Dropdown} from 'react-native-element-dropdown'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import {DropdownItem} from '.'

import {useTheme} from '@hooks'
import {StatusOption} from '@types'
import {getStatusLabel} from '@utils'
import {appColors} from '@config'

type StatusDropdownMenuProps = {
  selectedStatus: StatusOption
  setSelectedStatus: (status: StatusOption) => void
}

const StatusDropdownMenu = ({
  selectedStatus,
  setSelectedStatus,
}: StatusDropdownMenuProps) => {
  const {t} = useTranslation()
  const {isDark} = useTheme()

  const styles = StyleSheet.create({
    dropdown: {
      height: 58,
      borderWidth: 0, // removed border
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 16,
      borderColor: isDark
        ? appColors.neutral.gray[700]
        : appColors.neutral.gray[100],
      backgroundColor: isDark
        ? appColors.background.secondaryDark
        : appColors.background.secondaryLight,
      marginBottom: 10,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: isDark ? appColors.neutral.gray[300] : appColors.neutral.gray[500],
    },
    iconStyle: {
      width: 24,
      height: 24,
    },
    dropdownContent: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: isDark
        ? appColors.background.secondaryDark
        : appColors.background.secondaryLight,
      overflow: 'hidden',
      borderWidth: 0,
    },
  })

  const data = Object.values(StatusOption)
    .filter(
      option =>
        option !== StatusOption.All &&
        !!getStatusLabel(option as StatusOption, t),
    )
    .map(option => ({
      label: getStatusLabel(option as StatusOption, t),
      value: option,
    }))

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.dropdownContent}
      renderItem={(item, selected) => (
        <DropdownItem item={item} isSelected={!!selected} />
      )}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={selectedStatus}
      onChange={item => setSelectedStatus(item.value as StatusOption)}
      renderRightIcon={() => (
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={appColors.neutral.gray[500]}
        />
      )}
    />
  )
}

export default StatusDropdownMenu
