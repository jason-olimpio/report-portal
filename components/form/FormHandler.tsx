import {useState, useEffect} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {ZodType} from 'zod';

import {useTranslation} from 'react-i18next';

import FieldRenderer from './FieldRenderer';

import {extractFieldErrors, createAllTouchedState} from '@utils';

import {FormErrors, FormTouched, FieldRenderContext, FieldConfig} from '@types';

type FormHandlerProps<T extends Record<string, any>> = {
  schema: ZodType<T>;
  initialState: T;
  fields: FieldConfig[];
  onSave?: (data: T) => Promise<void> | void;
  className?: string;
  saveButtonLabel?: string;
};

export const FormHandler = <T extends Record<string, any>>({
  schema,
  initialState,
  fields,
  onSave,
  className,
  saveButtonLabel,
}: FormHandlerProps<T>) => {
  const {t} = useTranslation();
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldRenderer = new FieldRenderer<T>();

  useEffect(() => {
    setForm(initialState);
  }, [initialState]);

  const validate = (field: keyof T, value: any) => {
    const updatedForm = {...form, [field]: value};
    const {success, error} = schema.safeParse(updatedForm);

    if (success) {
      setErrors(currentErrors => ({...currentErrors, [field]: undefined}));
      return;
    }

    const fieldError =
      error.formErrors.fieldErrors[
        field as keyof typeof error.formErrors.fieldErrors
      ];

    setErrors(currentErrors => ({
      ...currentErrors,
      [field]: fieldError ? fieldError[0] : undefined,
    }));
  };

  const handleChange = (field: keyof T, value: any) => {
    setForm(currentForm => ({...currentForm, [field]: value}));
    setTouched(currentTouched => ({...currentTouched, [field]: true}));
    validate(field, value);
  };

  const resetFormState = () => {
    setForm(initialState);
    setTouched({});
  };

  const handleSave = async () => {
    const allTouched = createAllTouchedState<T>(fields);
    setTouched(allTouched);

    const {success, error} = schema.safeParse(form);

    if (!success) {
      const fieldErrors = error.formErrors.fieldErrors;
      setErrors(extractFieldErrors(fieldErrors));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (onSave) {
        await onSave(form);
        resetFormState();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContext: FieldRenderContext<T> = {
    form,
    touched,
    errors,
    handleChange,
  };

  return (
    <View
      className={`p-5 mb-5 rounded-xl bg-background-secondaryLight 
      dark:bg-background-secondaryDark ${className || ''}`}>
      {fields.map(field => {
        const fieldKey = field.key as keyof T;

        return fieldRenderer.render(field, fieldKey, renderContext);
      })}

      <TouchableOpacity
        onPress={handleSave}
        disabled={isSubmitting}
        className="rounded-full w-full mb-2 self-center items-center p-3 bg-primary-light dark:bg-primary-dark"
        accessibilityLabel={saveButtonLabel || t('forms.save')}>
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-titillium-bold text-white">
            {saveButtonLabel || t('forms.save')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
