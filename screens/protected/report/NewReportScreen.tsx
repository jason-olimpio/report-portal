import {Alert, ScrollView, type ImageSourcePropType} from 'react-native'
import {z} from 'zod'
import {useTranslation} from 'react-i18next'
import {NavigationProp, useNavigation} from '@react-navigation/native'

import {FormHandler, BackButton} from '@components'

import {useReports} from '@hooks'

import {addPendingReport} from '@storage'

import {
  type Report,
  StatusOption,
  PriorityOption,
  type FieldConfig,
  FormField,
  type MainTabParamList,
} from '@types'

import {getAddressFromLocation} from '@api'
import {isOnline} from '@utils'

const NewReportScreen = () => {
  const {t} = useTranslation()
  const {setReports} = useReports()
  const navigation = useNavigation<NavigationProp<MainTabParamList>>()

  const schema = z.object({
    title: z.string().min(3, {message: t('errors.titleTooShort')}),
    description: z.string().min(10, {message: t('errors.descriptionTooShort')}),
    images: z.array(z.custom<ImageSourcePropType>()).min(1, {
      message: t('errors.imagesRequired'),
    }),
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
      const address = await getAddressFromLocation(location)

      const newReport: Report = {
        id: Date.now().toString(),
        images,
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
        Alert.alert(t('reports.reportSavedOffline'))

        return
      }

      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))

      setReports(previousReports => [newReport, ...previousReports])

      Alert.alert(t('reports.reportSaved'))

      navigation.navigate('Reports')
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
