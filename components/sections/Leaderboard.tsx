/**
 * Leaderboard.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying the community leaderboard.
 * Shows top users based on points with badges and rankings.
 */

import {Fragment} from 'react'
import {View, Text} from 'react-native'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {userData} from '@store'

const Leaderboard = () => {
  const {t} = useTranslation()

  const topUsers = userData.sort((a, b) => b.points - a.points).slice(0, 3)

  const renderBadge = (idx: number, t: (key: string) => string) => {
    const badgeKeys = ['expert', 'veteran', 'active']
    const badgeKey = badgeKeys[idx] || 'active'

    return (
      <View className="ml-2 px-3 py-0.5 rounded-full bg-system-emerald-50-light dark:bg-system-emerald-50-dark">
        <Text
          className="font-titillium-regular text-xs text-system-emerald-600-light 
        dark:text-system-emerald-600-dark">
          {t(`stats.badge.${badgeKey}`)}
        </Text>
      </View>
    )
  }

  return (
    <>
      <Text className="text-xl font-titillium-bold dark:text-white mb-4">
        {t('stats.mostActiveCitizens')}
      </Text>

      <View className="mb-6 py-1 bg-white/80 dark:bg-neutral-gray-900 rounded-lg">
        {topUsers.map(({id, name, points}, idx) => (
          <Fragment key={id}>
            <View className="flex-row items-center p-2 px-6">
              <View
                className="w-8 h-8 rounded-full mr-1 bg-neutral-gray-200 
              dark:bg-neutral-gray-600 justify-center items-center">
                <Text className="font-titillium-semibold text-sm dark:text-white">
                  {idx + 1}
                </Text>
              </View>

              <View className="flex-1 ml-3">
                <Text className="font-titillium-bold text-lg dark:text-white">
                  {name}
                </Text>

                <View className="flex-row items-center">
                  <MaterialIcons name="star" size={15} color="#facc15" />

                  <Text
                    className="font-titillium-regular text-xs ml-0.5 text-neutral-gray-400 
                  dark:text-neutral-gray-200">
                    {points} {t('stats.points')}
                  </Text>
                </View>
              </View>

              {renderBadge(idx, t)}
            </View>

            {idx < topUsers.length - 1 && (
              <View className="h-px bg-neutral-gray-100 dark:bg-neutral-gray-600 mx-6" />
            )}
          </Fragment>
        ))}
      </View>
    </>
  )
}

export default Leaderboard
