import {Pressable, StyleSheet, Text, View} from 'react-native'

type TabValue = 'open' | 'closed'

type Props = {
  value: TabValue
  onChange: (next: TabValue) => void
  openLabel: string
  closedLabel: string
  openCount: number
  closedCount: number
}

type TabConfig = {
  key: TabValue
  label: string
  count: number
  activeBg: string
  activeText: string
  inactiveText: string
  rounded: string
}

const SegmentedTabs = ({
  value,
  onChange,
  openLabel,
  closedLabel,
  openCount,
  closedCount,
}: Props) => {
  const baseActiveBg = 'bg-white shadow-sm'
  const tabs: TabConfig[] = [
    {
      key: 'open',
      label: openLabel,
      count: openCount,
      activeBg: `${baseActiveBg} dark:bg-emerald-800`,
      activeText: 'text-emerald-700 dark:text-emerald-100',
      inactiveText: 'text-emerald-700 dark:text-emerald-200',
      rounded: 'rounded-l-xl',
    },
    {
      key: 'closed',
      label: closedLabel,
      count: closedCount,
      activeBg: `${baseActiveBg} dark:bg-teal-800`,
      activeText: 'text-teal-700 dark:text-teal-100',
      inactiveText: 'text-teal-700 dark:text-teal-200',
      rounded: 'rounded-r-xl',
    },
  ]

  return (
    <View className="flex-row justify-center items-center mb-4">
      <View
        className="flex-row bg-gray-200 dark:bg-gray-800 rounded-xl 
      overflow-hidden border border-gray-300 dark:border-gray-700">
        {tabs.map(
          ({
            key,
            label,
            count,
            activeBg,
            activeText,
            inactiveText,
            rounded,
          }) => {
            const isActive = value === key

            return (
              <Pressable
                key={key}
                className="flex-1"
                onPress={() => onChange(key)}>
                <View className="relative px-6 py-2 items-center justify-center">
                  <View
                    pointerEvents="none"
                    style={StyleSheet.absoluteFill}
                    className={`${activeBg} ${rounded} ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />

                  <Text
                    className={`font-titillium-bold text-center ${
                      isActive
                        ? `${activeText} opacity-100`
                        : `${inactiveText} opacity-70`
                    }`}>
                    {label} ({count})
                  </Text>
                </View>
              </Pressable>
            )
          },
        )}
      </View>
    </View>
  )
}

export default SegmentedTabs
