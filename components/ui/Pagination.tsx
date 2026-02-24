import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import {useTheme} from '@hooks'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

type PageItem = number | 'ellipsis-left' | 'ellipsis-right'

const MAX_VISIBLE_PAGES = 5 as const

const clampToRange = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const buildPaginationItems = (
  activePage: number,
  totalPageCount: number,
): PageItem[] => {
  const normalizedTotalPages = Math.max(0, totalPageCount)
  const lastPage = normalizedTotalPages

  const smallPagination =
    normalizedTotalPages > 0 &&
    normalizedTotalPages <= MAX_VISIBLE_PAGES &&
    Array.from({length: normalizedTotalPages}, (_, i) => i + 1)

  const paginationNearStart =
    normalizedTotalPages > MAX_VISIBLE_PAGES &&
    activePage <= 3 &&
    ([1, 2, 3, 4, 'ellipsis-right', lastPage] as const)

  const paginationNearEnd =
    normalizedTotalPages > MAX_VISIBLE_PAGES &&
    activePage >= lastPage - 2 &&
    ([
      1,
      'ellipsis-left',
      lastPage - 3,
      lastPage - 2,
      lastPage - 1,
      lastPage,
    ] as const)

  const paginationInMiddle =
    normalizedTotalPages > MAX_VISIBLE_PAGES &&
    ([
      1,
      'ellipsis-left',
      activePage - 1,
      activePage,
      activePage + 1,
      'ellipsis-right',
      lastPage,
    ] as const)

  return (smallPagination ||
    paginationNearStart ||
    paginationNearEnd ||
    paginationInMiddle ||
    []) as PageItem[]
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const iconColor = (isDark && 'white') || 'black'

  const activePage =
    (totalPages > 0 && clampToRange(currentPage, 1, totalPages)) || 1

  const paginationItems = buildPaginationItems(activePage, totalPages)

  const changePage = (nextPage: number) => {
    if (totalPages <= 0) return

    const nextPageClamped = clampToRange(nextPage, 1, totalPages)
    if (nextPageClamped !== activePage) onPageChange(nextPageClamped)
  }

  const isPreviousEnabled = totalPages > 0 && activePage > 1
  const isNextEnabled = totalPages > 0 && activePage < totalPages

  const renderEllipsisItem = (key: 'ellipsis-left' | 'ellipsis-right') => (
    <View key={key} className="mx-1">
      <MaterialIcons name="more-horiz" size={15} color={iconColor} />
    </View>
  )

  const renderPageButton = (pageNumber: number) => {
    const isActivePage = activePage === pageNumber
    const pageBackgroundClass =
      (isActivePage && 'bg-primary-light dark:bg-primary-dark') ||
      'bg-neutral-gray-200 dark:bg-neutral-gray-600'
    const pageTextClass =
      (isActivePage && 'text-white') || 'text-black dark:text-white'

    return (
      <TouchableOpacity
        key={`page-${pageNumber}`}
        onPress={() => changePage(pageNumber)}
        className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${pageBackgroundClass}`}>
        <Text className={`text-sm font-titillium-semibold ${pageTextClass}`}>
          {pageNumber}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      className={`flex flex-row items-center justify-center mt-2 mb-16 ${className}`}>
      <TouchableOpacity
        onPress={() => changePage(activePage - 1)}
        disabled={!isPreviousEnabled}
        className={`p-2 rounded-full ${(!isPreviousEnabled && 'opacity-50') || ''}`}
        accessibilityLabel={t('previous')}>
        <MaterialIcons name="arrow-back-ios" size={15} color={iconColor} />
      </TouchableOpacity>

      <View className="flex flex-row items-center">
        {paginationItems.map(
          item =>
            (typeof item === 'number' && renderPageButton(item)) ||
            renderEllipsisItem(item as 'ellipsis-left' | 'ellipsis-right'),
        )}
      </View>

      <TouchableOpacity
        onPress={() => changePage(activePage + 1)}
        disabled={!isNextEnabled}
        className={`p-2 rounded-full ${(!isNextEnabled && 'opacity-50') || ''}`}
        accessibilityLabel={t('next')}>
        <MaterialIcons name="arrow-forward-ios" size={15} color={iconColor} />
      </TouchableOpacity>
    </View>
  )
}

export default Pagination
