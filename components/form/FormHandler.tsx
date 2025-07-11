import {ComponentProps, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {ZodType} from 'zod';
import {useTranslation} from 'react-i18next';

import {ImageSliderField, LocationField, TextField} from '@components';

export type FieldConfig = {
  key: string;
  label: string;
  inputProps?: Partial<ComponentProps<typeof TextInput>>;
  isImageSlider?: boolean;
  isLocation?: boolean;
  maxImages?: number;
};

type FormHandlerProps<T extends Record<string, any>> = {
  schema: ZodType<T>;
  initialState: T;
  fields: FieldConfig[];
  onSave?: (data: T) => Promise<void> | void;
  className?: string;
};

const IMAGE_FIELD_KEY = 'image';
const LOCATION_FIELD_KEY = 'location';

export const FormHandler = <T extends Record<string, any>>({
  schema,
  initialState,
  fields,
  onSave,
  className,
}: FormHandlerProps<T>) => {
  const {t} = useTranslation();
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof T, value: any) => {
    setForm(currentForm => ({...currentForm, [field]: value}));
    setTouched(currentTouched => ({...currentTouched, [field]: true}));
    validate(field, value);
  };

  const validate = (field: keyof T, value: any) => {
    const updatedForm = {...form, [field]: value};
    const validationResult = schema.safeParse(updatedForm);

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

  const extractFieldErrors = <U = any,>(
    fieldErrors: Record<string, unknown>,
  ): Partial<Record<keyof U, string>> =>
    Object.entries(fieldErrors).reduce(
      (accumulator, [fieldKey, errorValue]) => {
        if (Array.isArray(errorValue) && errorValue.length > 0) {
          accumulator[fieldKey as keyof U] = errorValue[0] as string;
        }

        return accumulator;
      },
      {} as Partial<Record<keyof U, string>>,
    );

  const handleSave = async () => {
    const allTouched = fields.reduce(
      (accumulator, field) => {
        const fieldKey = field.key as keyof T;
        accumulator[fieldKey] = true;
        return accumulator;
      },
      {} as Partial<Record<keyof T, boolean>>,
    );

    setTouched(allTouched);

    setForm(currentForm => ({...currentForm}));

    const validationResult = schema.safeParse(form);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;
      setErrors(extractFieldErrors(fieldErrors));

      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (!onSave) {
        return;
      }

      await onSave(form);
      resetFormState();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setForm(initialState);
    setTouched({});
  };

  const renderField = (field: FieldConfig, fieldKey: keyof T) => {
    const fieldProps = {
      label: field.label,
      error: touched[fieldKey] && errors[fieldKey],
    };

    if (field.isImageSlider) {
      return (
        <ImageSliderField
          key={fieldKey as string}
          {...fieldProps}
          imageUris={form[IMAGE_FIELD_KEY as keyof T] as string[] | undefined}
          onImagesSelected={(uris: string[]) =>
            handleChange(IMAGE_FIELD_KEY as keyof T, uris)
          }
          onLocationCaptured={location =>
            handleChange(LOCATION_FIELD_KEY as keyof T, location)
          }
          maxImages={field.maxImages}
        />
      );
    }

    if (field.isLocation) {
      const locationData = form[LOCATION_FIELD_KEY as keyof T] as
        | {latitude: number; longitude: number}
        | undefined;

      return (
        <LocationField
          key={fieldKey as string}
          {...fieldProps}
          location={locationData}
        />
      );
    }

    return (
      <TextField
        key={fieldKey as string}
        {...fieldProps}
        value={form[fieldKey] as string}
        onChangeText={value => handleChange(fieldKey, value)}
        {...field.inputProps}
      />
    );
  };

  return (
    <ScrollView
      className={`flex-1 p-5 mb-10 rounded-lg bg-background-secondaryLight 
      dark:bg-background-secondaryDark ${className || ''}`}>
      {fields.map(field => {
        const fieldKey = field.key as keyof T;

        return renderField(field, fieldKey);
      })}

      <TouchableOpacity
        onPress={handleSave}
        disabled={isSubmitting}
        className="rounded-full w-full self-center items-center p-3 bg-primary-light dark:bg-primary-dark"
        accessibilityLabel={t('save')}>
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-titillium-bold text-white">{t('save')}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};
