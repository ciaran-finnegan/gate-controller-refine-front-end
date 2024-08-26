import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, TimePicker } from "antd";
import moment, { Moment } from "moment";

interface ScheduleFormData {
    day_of_week: string;
    start_time: Moment | null; // Using moment type for time-related fields
    end_time: Moment | null;
}

export const SchedulesEdit = () => {
    const { formProps, saveButtonProps } = useForm<ScheduleFormData>({
        metaData: {
            onLoad: (data: ScheduleFormData) => {
                return {
                    ...data,
                    start_time: data.start_time ? moment(data.start_time, "HH:mm:ss") : null,
                    end_time: data.end_time ? moment(data.end_time, "HH:mm:ss") : null,
                };
            },
            transform: (values: ScheduleFormData) => {
                return {
                    ...values,
                    start_time: values.start_time ? values.start_time.format("HH:mm:ss") : null,
                    end_time: values.end_time ? values.end_time.format("HH:mm:ss") : null,
                };
            },
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
                    <TimePicker format="HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="End Time"
                    name="end_time"
                    rules={[{ required: true }]}
                >
                    <TimePicker format="HH:mm:ss" />
                </Form.Item>
            </Form>
        </Edit>
    );
};