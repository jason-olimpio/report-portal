import {Alert, TouchableOpacity, Text, View} from 'react-native';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {ValidatedForm, FieldConfig} from '@components';

const NewReportScreen = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const reportSchema = z.object({
        title: z.string().min(3, {message: t('errors.titleTooShort')}),
        description: z.string().min(10, {message: t('errors.descriptionTooShort')}),
        image: z.string().min(1, {message: t('errors.imageRequired')}),
    });

    const initialState: z.infer<typeof reportSchema> = {
        title: '',
        description: '',
        image: '',
    };

    const fields: FieldConfig[] = [
        {key: 'image', label: t('image'), isImage: true},
        {key: 'title', label: t('title')},
        {
            key: 'description',
            label: t('description'),
            inputProps: {multiline: true, style: {minHeight: 80}},
        },
    ];

    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity
                onPress={navigation.goBack}
                className="mt-4 ml-4 mb-2 self-start px-4 py-2 flex-row items-center">
                <MaterialIcons name="arrow-back-ios" size={15}/>

                <Text className="ml-1">{t('back')}</Text>
            </TouchableOpacity>

            <ValidatedForm
                schema={reportSchema}
                initialState={initialState}
                fields={fields}
                onSave={async () => Alert.alert(t('reportSaved'))}
            />
        </View>
    );
};

export default NewReportScreen;
