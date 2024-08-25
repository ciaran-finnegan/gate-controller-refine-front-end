import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const SchedulesShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Day of Week"}</Title>
      <TextField value={record?.day_of_week} />
      <Title level={5}>{"Start Time"}</Title>
      <TextField value={record?.start_time} />
      <Title level={5}>{"End Time"}</Title>
      <TextField value={record?.end_time} />
    </Show>
  );
};