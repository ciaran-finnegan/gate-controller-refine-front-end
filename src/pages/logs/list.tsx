import React from "react";
import { useSimpleList } from "@refinedev/antd";
import { Typography, List, Select, Row, Col, Spin } from "antd";
import moment from "moment";

const { Text } = Typography;

interface ILog {
  id: number;
  image_path: string;
  timestamp: string;
  reason: string;
}

export const LogList: React.FC = () => {
  const { listProps, setFilters, queryResult } = useSimpleList<ILog>({
    resource: "log",
    sorters: {
      initial: [
        {
          field: "timestamp",
          order: "desc",
        },
      ],
    },
    syncWithLocation: true,
  });

  const formatDate = (date: string) => {
    return moment(date).format("MMM Do YY, h:mm a");
  };

  if (queryResult.isLoading) {
    return <Spin />;
  }

  if (queryResult.isError) {
    return <div>Error: {queryResult.error.message}</div>;
  }

  const handleFilterChange = (field: string) => (value: string) => {
    setFilters((prevFilters) => {
      // Filter out previous filters of the same field
      const filters = prevFilters.filter((filter) => !(filter as any).field || (filter as any).field !== field);
      if (value) {
        filters.push({
          field,
          operator: "eq",
          value,
        });
      }
      return filters;
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={12}>
          <Select
            placeholder="Select plate number"
            style={{ width: "100%" }}
            onChange={handleFilterChange("plate_number")}
            allowClear
          >
            <Select.Option value="181wh624">181WH624</Select.Option>
            <Select.Option value="11wh2571">11WH2571</Select.Option>
            <Select.Option value="172l66">172L66</Select.Option>
            <Select.Option value="10wx2791">10WX2791</Select.Option>
            <Select.Option value="11wh2041">11WH2041</Select.Option>
            <Select.Option value="10ce1990">10CE1990</Select.Option>
            <Select.Option value="161mn244">161MN244</Select.Option>
            <Select.Option value="151d52487">151D52487</Select.Option>
            <Select.Option value="11wh2397">11WH2397</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={12}>
          <Select
            placeholder="Select registered name"
            style={{ width: "100%" }}
            onChange={handleFilterChange("vehicle_registered_to_name")}
            allowClear
          >
            <Select.Option value="johnny coghill">Johnny Coghill</Select.Option>
            <Select.Option value="josephine finnegan">Josephine Finnegan</Select.Option>
            <Select.Option value="fiachra finnegan">Fiachra Finnegan</Select.Option>
            <Select.Option value="alicia finnegan">Alicia Finnegan</Select.Option>
            <Select.Option value="aengus finnegan">Aengus Finnegan</Select.Option>
            <Select.Option value="liam finnegan">Liam Finnegan</Select.Option>
            <Select.Option value="maeve forsyth">Maeve Forsyth</Select.Option>
            <Select.Option value="yvonne donoghue">Yvonne Donoghue</Select.Option>
          </Select>
        </Col>
      </Row>

      <List
        {...listProps}
        grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 4 }}
        renderItem={(item) => (
          <List.Item>
            <div style={{  padding: "16px", borderRadius: "8px" }}>
              <img src={item.image_path} alt="vehicle" style={{ width: "100%", height: "auto" }} />
              <Text style={{ display: "block", marginTop: "8px" }}>{formatDate(item.timestamp)}</Text>
              <Text style={{ display: "block" }}>{item.reason}</Text>
            </div>
          </List.Item>
        )}
        pagination={{
          ...listProps.pagination,
          showSizeChanger: true,
          pageSizeOptions: ["8", "20", "48", "100"],
          position: "bottom",
        }}
      />
    </div>
  );
};