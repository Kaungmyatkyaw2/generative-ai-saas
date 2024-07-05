import React from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from '../ui/form';

type CustomFieldProps<T extends FieldValues> = {
    control: Control<T> | undefined;
    render: (props: { field: ControllerRenderProps<T, Path<T>> }) => React.ReactNode;
    name: Path<T>;
    label?: string;
    className?: string;
};

export function CustomFormField<T extends FieldValues>({
    control,
    render,
    name,
    label,
    className,
}: CustomFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel className='text-neutral-600'>{label}</FormLabel>}
                    <FormControl>{render({ field })}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
