import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import type { BaseRecord } from "@refinedev/core";
  import { Space, Table } from "antd";
  
  export const PlatesList = () => {
    const { tableProps } = useTable({
      syncWithLocation: true,
    });
  
    return (
      <List title="Manage vehicle licence plates which will open the gate automatically">
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="plate" title={"Plate"} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="colour" title={"Colour"} />
          <Table.Column dataIndex="make" title={"Make"} />
          <Table.Column dataIndex="model" title={"Model"} />
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