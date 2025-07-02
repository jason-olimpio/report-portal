import {ComponentProps, useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {
    launchImageLibrary,
    launchCamera,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import {ZodType} from 'zod';
import {useTranslation} from 'react-i18next';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {appColors} from '@config';

export type FieldConfig = {
    key: string;
    label: string;
    inputProps?: Partial<ComponentProps<typeof TextInput>>;
    isImage?: boolean;
};

export type ValidatedFormProps<T extends Record<string, any>> = {
    schema: ZodType<T>;
    initialState: T;
    fields: FieldConfig[];
    onSave?: (data: T) => Promise<void> | void;
};

export const IMAGE_FIELD_KEY = 'image';

export const ValidatedForm = <T extends Record<string, any>>({
                                                                 schema,
                                                                 initialState,
                                                                 fields,
                                                                 onSave,
                                                             }: ValidatedFormProps<T>) => {
    const {t} = useTranslation();
    const [form, setForm] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [uploading, setUploading] = useState(false);

    const handleChange = (field: keyof T, value: any) => {
        setForm(currentForm => ({...currentForm, [field]: value}));
        setTouched(currentTouched => ({...currentTouched, [field]: true}));
        validate(field, value);
    };

    const validate = (field: keyof T, value: any) => {
        const validationResult = schema.safeParse({...form, [field]: value});

        if (validationResult.success) {
            setErrors(currentErrors => ({...currentErrors, [field]: undefined}));
            return;
        }

        const fieldError =
            validationResult.error.formErrors.fieldErrors[
                field as keyof typeof validationResult.error.formErrors.fieldErrors
                ];

        setErrors(currentErrors => ({
            ...currentErrors,
            [field]: fieldError ? fieldError[0] : undefined,
        }));
    };

    const pickImageFromCamera = async () => {
        const cameraOptions: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1
        };

        await launchCamera(cameraOptions, response => {
            if (response.didCancel) return;

            if (response.errorCode) {
                Alert.alert(t('errors.permissionDenied'));
                return;
            }

            const selectedUri = response.assets?.[0]?.uri;

            if (!selectedUri) return;

            setForm(currentForm => ({...currentForm, [IMAGE_FIELD_KEY]: selectedUri}));
        });
    };

    const pickImageFromGallery = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
        };

        await launchImageLibrary(options, response => {
            if (response.didCancel) return;

            if (response.errorCode) {
                Alert.alert(t('errors.permissionDenied'));
                return;
            }

            const selectedUri = response.assets?.[0]?.uri;

            if (!selectedUri) return;

            setForm(currentForm => ({...currentForm, [IMAGE_FIELD_KEY]: selectedUri}));
        });
    };

    const handlePickImage = async () =>
        Alert.alert(
            t('imageSource.title'),
            '',
            [
                {
                    text: t('cancel', 'Annulla'),
                    style: 'cancel',
                },
                {
                    text: t('imageSource.camera'),
                    onPress: pickImageFromCamera,
                },
                {
                    text: t('imageSource.gallery'),
                    onPress: pickImageFromGallery,
                },
            ]
        );

    const handleSave = async () => {
        // Mark all fields as touched to show errors on save.
        const allTouched = fields.reduce((accumulator, field) => {
            accumulator[field.key as keyof T] = true;

            return accumulator;
        }, {} as Partial<Record<keyof T, boolean>>);

        setTouched(allTouched);

        const validationResult = schema.safeParse(form);

        if (!validationResult.success) {
            setErrors(
                extractFieldErrors(validationResult.error.formErrors.fieldErrors),
            );
            return;
        }

        setErrors({});
        setUploading(true);

        try {
            if (onSave) {
                await onSave(form);
                setForm(initialState);
                setTouched({});
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert(t('reportSaved') || 'Saved!');

            setForm(initialState);
            setTouched({});
        } finally {
            setUploading(false);
        }
    };

    const extractFieldErrors = (
        fieldErrors: Record<string, unknown>,
    ): Partial<Record<keyof T, string>> =>
        Object.entries(fieldErrors).reduce(
            (accumulator, [fieldKey, errorValue]) => {
                if (Array.isArray(errorValue) && errorValue.length > 0) {
                    accumulator[fieldKey as keyof T] = errorValue[0];
                }

                return accumulator;
            },
            {} as Partial<Record<keyof T, string>>,
        );

    const renderImageField = ({key, label}: FieldConfig) => {
        if (key !== IMAGE_FIELD_KEY) {
            return null;
        }

        const imageUri = form[IMAGE_FIELD_KEY as keyof T] as string | undefined;
        const error =
            touched[IMAGE_FIELD_KEY as keyof T] && errors[IMAGE_FIELD_KEY as keyof T];

        return (
            <View key={key} className="items-center mb-4">
                <TouchableOpacity
                    onPress={handlePickImage}
                    className="mt-6 mb-4 items-center justify-center h-44 w-44 rounded-full self-center border-[1px] border-neutral-500"
                    accessibilityLabel={label}>
                    {imageUri ? (
                        <Image
                            source={{uri: imageUri}}
                            className="h-44 w-44 rounded-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="h-44 w-44 rounded-full items-center justify-center">
                            <MaterialIcons
                                name="add-a-photo"
                                size={25}
                                color={appColors.neutral.gray[500]}
                            />
                        </View>
                    )}
                </TouchableOpacity>

                {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
            </View>
        );
    };

    const renderTextField = ({key, label, inputProps}: FieldConfig) => {
        const fieldKey = key as keyof T;
        const error = touched[fieldKey] && errors[fieldKey];

        return (
            <View key={key} className="mb-2">
                <TextInput
                    placeholder={label}
                    value={form[fieldKey]?.toString() ?? ''}
                    onChangeText={text => handleChange(fieldKey, text)}
                    onBlur={() => setTouched({...touched, [key]: true})}
                    className="border border-neutral-gray-100 rounded-lg p-4 mb-2"
                    placeholderTextColor={appColors.neutral.gray[500]}
                    {...inputProps}
                />

                {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
            </View>
        );
    };

    return (
        <ScrollView className="flex-1 p-5 bg-white">
            {fields.map(field => {
                if (field.isImage) {
                    return renderImageField(field);
                }

                return renderTextField(field);
            })}

            <TouchableOpacity
                onPress={handleSave}
                disabled={uploading}
                className="rounded-full w-full self-center items-center mt-2 mb-10 p-3 bg-primary"
                accessibilityLabel={t('save')}>
                {uploading ? (
                    <ActivityIndicator color="#fff"/>
                ) : (
                    <Text className="text-white font-titillium-bold">{t('save')}</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};
