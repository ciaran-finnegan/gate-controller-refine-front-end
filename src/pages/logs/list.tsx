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
    pagination: {
      pageSize: 48,
    },
  });

  // Function to format the timestamp to a more readable format
  const formatDate = (date: string) => {
    const momentDate = moment(date);
    const today = moment().startOf('day'); // Start of today
    const yesterday = moment().subtract(1, 'days').startOf('day'); // Start of yesterday
  
    if (momentDate.isSame(today, 'day')) {
      return `Today, ${momentDate.format("h:mm:ss a")}`; // e.g., "Today, 5:00:51 pm"
    } else if (momentDate.isSame(yesterday, 'day')) {
      return `Yesterday, ${momentDate.format("h:mm:ss a")}`; // e.g., "Yesterday, 5:00:51 pm"
    } else {
      return momentDate.format("MMMM Do YYYY, h:mm:ss a"); // e.g., "August 26th 2024, 5:00:51 pm"
    }
  };

  if (queryResult.isLoading) {
    return <Spin />;
  }

  if (queryResult.isError) {
    return <div>Error: {queryResult.error.message}</div>;
  }

  const handleFilterChange = (field: string) => (value: string) => {
    setFilters((prevFilters) => {
      const filters = prevFilters.filter(
        (filter) => !(filter as any).field || (filter as any).field !== field
      );
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
            {/* Plate number options */}
          </Select>
        </Col>
        <Col xs={24} sm={12}>
          <Select
            placeholder="Select registered name"
            style={{ width: "100%" }}
            onChange={handleFilterChange("vehicle_registered_to_name")}
            allowClear
          >
            {/* Registered name options */}
          </Select>
        </Col>
      </Row>

      <List
        {...listProps}
        grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 4 }}
        renderItem={(item) => (
          <List.Item>
            <div style={{ padding: "16px", borderRadius: "8px" }}>
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