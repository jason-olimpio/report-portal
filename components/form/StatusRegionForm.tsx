import {useState} from 'react'
import {View, Text, Alert} from 'react-native'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {useReports} from '@hooks'
import {reportData} from '@store'
import {StatusOption} from '@types'

import AddressAutocompleteInput from './AddressAutoCompleteInput'
import StatusDropdownMenu from './dropdown/StatusDropdownMenu'

import {SaveButton} from '@components'

type StatusRegionFormProps = {
  reportId: string
  status: StatusOption
}

const StatusRegionForm = ({reportId, status}: StatusRegionFormProps) => {
  const {setReports} = useReports()
  const {t} = useTranslation()

  const formSchema = z.object({
    status: z.nativeEnum(StatusOption, {
      errorMap: () => ({message: t('errors.statusRequired')}),
    }),
    address: z.string().min(1, t('errors.addressRequired')),
  })

  type FormSchema = z.infer<typeof formSchema>

  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(status)
  const [newAddress, setNewAddress] = useState<FormSchema['address']>('')
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormSchema, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addressList = Array.from(
    new Set(reportData.map(({address}) => address).filter(Boolean)),
  )

  const handleSubmitChanges = () => {
    setIsSubmitting(true)

    const {success, error} = formSchema.safeParse({
      address: newAddress,
      status: selectedStatus,
    })

    if (!success) {
      const fieldErrors = Object.fromEntries(
        error.errors.map(err => [err.path[0], err.message]),
      ) as Partial<Record<keyof FormSchema, string>>

      setErrors(fieldErrors)
      setIsSubmitting(false)
      return
    }

    setErrors({})

    const updatedReports = (previousReports: typeof reportData) =>
      previousReports.map(report =>
        report.id === reportId
          ? {
              ...report,
              status: selectedStatus,
              address: newAddress || report.address,
            }
          : report,
      )

    setReports(updatedReports)
    setIsSubmitting(false)

    Alert.alert(
      t('forms.successTitle'),
      t('forms.successMessage'),
      [
        {
          text: t('common.ok'),
          onPress: () => {
            setSelectedStatus(selectedStatus)
            setNewAddress('')
            setErrors({})
          },
        },
      ],
      {cancelable: true},
    )
  }

  const {status: statusError, address: addressError} = errors

  return (
    <View className="mt-4 mb-10">
      <StatusDropdownMenu
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {statusError && (
        <Text className="text-red-500 font-titillium-regular mb-2 text-sm">
          {statusError}
        </Text>
      )}

      <AddressAutocompleteInput
        value={newAddress}
        onValueChange={setNewAddress}
        data={addressList}
      />

      {addressError && (
        <Text className="text-red-500 mt-2 mb-1 text-sm font-titillium-regular">
          {addressError}
        </Text>
      )}

      <SaveButton
        onPress={handleSubmitChanges}
        disabled={isSubmitting}
        isSubmitting={isSubmitting}
        className="mt-6"
      />
    </View>
  )
}

export default StatusRegionForm
