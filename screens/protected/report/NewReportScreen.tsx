import {Alert, ScrollView} from 'react-native'
import {z} from 'zod'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'

import {FormHandler, BackButton} from '@components'

import {useReports} from '@hooks'

import {addPendingReport} from '@storage'

import {
  type Report,
  StatusOption,
  PriorityOption,
  type FieldConfig,
  FormField,
} from '@types'

import {getAddressFromLocation} from '@api'
import {isOnline, persistImageUris} from '@utils'

const NewReportScreen = () => {
  const {t} = useTranslation()
  const {setReports} = useReports()
  const navigation = useNavigation()

  const schema = z.object({
    title: z.string().min(3, {message: t('errors.titleTooShort')}),
    description: z.string().min(10, {message: t('errors.descriptionTooShort')}),
    images: z
      .array(z.string().min(1))
      .min(1, {message: t('errors.imagesRequired')}),
    location: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .refine(location => location.latitude !== 0 && location.longitude !== 0, {
        message: t('errors.locationRequired'),
      }),
  })

  const initialState: z.infer<typeof schema> = {
    title: '',
    description: '',
    images: [],
    location: {latitude: 0, longitude: 0},
  }

  const fields: FieldConfig[] = [
    {
      type: FormField.ImageSlider,
      key: 'images',
      label: t('forms.image'),
      maxImages: 5,
    },
    {type: FormField.Text, key: 'title', label: t('forms.title')},
    {
      type: FormField.Text,
      key: 'description',
      label: t('forms.description'),
      inputProps: {multiline: true, style: {minHeight: 80}},
    },
    {
      type: FormField.Location,
      key: 'location',
      label: t('location.location'),
    },
  ]

  const handleReportSave = async ({
    images,
    title,
    description,
    location,
  }: z.infer<typeof schema>) => {
    try {
      const persistedImages = await persistImageUris(images)
      const address = await getAddressFromLocation(location)

      const newReport: Report = {
        id: Date.now().toString(),
        images: persistedImages,
        title,
        description,
        address,
        location,
        date: new Date(),
        status: StatusOption.Pending,
        priority: PriorityOption.Medium,
      }

      const onlineStatus: boolean = await isOnline()

      if (!onlineStatus) {
        await addPendingReport(newReport)

        Alert.alert(t('reports.reportSavedOffline'), '', [
          {text: 'OK', onPress: navigation.goBack},
        ])

        return
      }

      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))

      setReports(previousReports => [newReport, ...previousReports])

      Alert.alert(t('reports.reportSaved'), '', [
        {
          text: 'OK',
          onPress: navigation.goBack,
        },
      ])
    } catch {
      Alert.alert(t('error'), t('errors.reportSendFailed'))
    }
  }

  return (
    <ScrollView className="p-5 flex-1 bg-background-secondaryLight dark:bg-background-secondaryDark">
      <BackButton />

      <FormHandler
        schema={schema}
        initialState={initialState}
        fields={fields}
        onSave={handleReportSave}
      />
    </ScrollView>
  )
}

export default NewReportScreen
