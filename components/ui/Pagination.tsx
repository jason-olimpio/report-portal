import {Fragment} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {useTheme} from '@hooks';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  const {isDark} = useTheme();
  const {t} = useTranslation();

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    }

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - (maxVisiblePages - 2));
    }

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <View
      className={`flex flex-row items-center justify-center my-5 ${className}`}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${currentPage === 1 ? 'opacity-50' : ''}`}
        accessibilityLabel={t('previous')}>
        <MaterialIcons
          name="arrow-back-ios"
          size={15}
          color={isDark ? 'white' : 'black'}
        />
      </TouchableOpacity>

      <View className="flex flex-row items-center">
        {getPageNumbers().map((page, index) => (
          <Fragment key={index}>
            {page === '...' ? (
              <View className="mx-1">
                <MaterialIcons
                  name="more-horiz"
                  size={15}
                  color={isDark ? 'white' : 'black'}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => typeof page === 'number' && onPageChange(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${
                  currentPage === page
                    ? 'bg-primary-light dark:bg-primary-dark'
                    : 'bg-neutral-gray-200 dark:bg-neutral-gray-600'
                }`}>
                <Text
                  className={`text-sm font-titillium-semibold ${currentPage === page ? 'text-white' : 'text-black'}`}>
                  {page}
                </Text>
              </TouchableOpacity>
            )}
          </Fragment>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${currentPage === totalPages ? 'opacity-50' : ''}`}
        accessibilityLabel={t('next')}>
        <MaterialIcons
          name="arrow-forward-ios"
          size={15}
          color={isDark ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
