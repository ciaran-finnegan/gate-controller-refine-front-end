import { Create, useForm } from "@refinedev/antd";
import { Form, Input, TimePicker } from "antd";

export const SchedulesCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Day of Week"}
          name={["day_of_week"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Start Time"}
          name={["start_time"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker format={"HH:mm"} />
        </Form.Item>
        <Form.Item
          label={"End Time"}
          name={["end_time"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker format={"HH:mm"} />
        </Form.Item>
      </Form>
    </Create>
  );
};