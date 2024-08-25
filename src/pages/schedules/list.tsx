import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import type { BaseRecord } from "@refinedev/core";
  import { Space, Table } from "antd";
  
  export const SchedulesList = () => {
    const { tableProps } = useTable({
      syncWithLocation: true,
    });
  
    return (
      <List title="Manage Access Schedules">
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="day_of_week" title={"Day of Week"} />
          <Table.Column dataIndex="start_time" title={"Start Time"} />
          <Table.Column dataIndex="end_time" title={"End Time"} />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    );
  };