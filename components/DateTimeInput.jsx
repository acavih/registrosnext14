"use client";
import 'dayjs/locale/es'
import { DatePickerInput, DatesProvider } from '@mantine/dates';

export function DateTimeInput({ ...props }) {
  return (
    <DatesProvider settings={{ locale: 'es' }}>
      <DatePickerInput {...props} />
    </DatesProvider>
  );
}
