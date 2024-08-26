import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

// Define a type for the form data
interface ScheduleFormData {
    day_of_week: string;
    start_time: string | null; // Time as a string
    end_time: string | null;   // Time as a string
}

export const SchedulesEdit = () => {
    const { formProps, saveButtonProps } = useForm<ScheduleFormData>({
        metaData: {
            // Transform loaded data into the correct format for form usage
            onLoad: (data: ScheduleFormData) => ({
                ...data,
                start_time: data.start_time || "", // Ensure start_time is a string
                end_time: data.end_time || "",     // Ensure end_time is a string
            }),
            // Transform data back into the correct format for submission
            transform: (values: ScheduleFormData) => ({
                ...values,
                start_time: values.start_time || null,
                end_time: values.end_time || null,
            }),
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Day of Week"
                    name="day_of_week"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Start Time"
                    name="start_time"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="End Time"
                    name="end_time"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="HH:mm:ss" />
                </Form.Item>
            </Form>
        </Edit>
    );
};