import React from "react";
import { useSimpleList, useSelect } from "@refinedev/antd";
import { Typography, List, Select, Row, Col, Spin, SelectProps } from "antd";
import moment from "moment";

const { Text } = Typography;

interface ILog {
  id: number;
  image_path: string;
  timestamp: string;
  reason: string;
  plate_number: string;
  vehicle_registered_to_name: string;
}

// Function to format plate numbers: uppercase and hyphenate appropriately
const formatPlateNumber = (plate: string | null | undefined) => {
  if (!plate) return ""; // Return an empty string if plate is null or undefined
  return plate.toUpperCase().replace(/^([A-Z]{1,2})(\d+)$/, "$1-$2");
};

// Function to capitalise first and last names
const formatName = (name: string | null | undefined) => {
  if (!name) return ""; // Return an empty string if name is null or undefined
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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

  // Fetch plate numbers
  const { selectProps: plateNumberSelectProps } = useSelect({
    resource: "log",
    optionLabel: "plate_number",
    optionValue: "plate_number",
  });

  // Fetch registered names
  const { selectProps: registeredNameSelectProps } = useSelect({
    resource: "log",
    optionLabel: "vehicle_registered_to_name",
    optionValue: "vehicle_registered_to_name",
  });

  const formatDate = (date: string) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return `Today, ${momentDate.format("h:mm:ss a")}`;
    } else if (momentDate.isSame(yesterday, "day")) {
      return `Yesterday, ${momentDate.format("h:mm:ss a")}`;
    } else {
      return momentDate.format("MMMM Do YYYY, h:mm:ss a");
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

  // Define a type-safe version of your options
  const formattedPlateNumberOptions: { label: string; value: string }[] =
    plateNumberSelectProps.options?.map((option) => ({
      label: formatPlateNumber(String(option.label)), // Ensure label is a string
      value: String(option.value), // Ensure value is a string
    })) || [];

  const formattedRegisteredNameOptions: { label: string; value: string }[] =
    registeredNameSelectProps.options?.map((option) => ({
      label: formatName(String(option.label)), // Ensure label is a string
      value: String(option.value), // Ensure value is a string
    })) || [];

  // Define SelectProps type specific to string value
  const plateSelectProps: SelectProps<string> = {
    placeholder: "Select plate number",
    style: { width: "100%" },
    onChange: handleFilterChange("plate_number"),
    allowClear: true,
    options: formattedPlateNumberOptions,
  };

  const nameSelectProps: SelectProps<string> = {
    placeholder: "Select registered name",
    style: { width: "100%" },
    onChange: handleFilterChange("vehicle_registered_to_name"),
    allowClear: true,
    options: formattedRegisteredNameOptions,
  };

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={12}>
          <Select {...plateSelectProps} />
        </Col>
        <Col xs={24} sm={12}>
          <Select {...nameSelectProps} />
        </Col>
      </Row>

      <List
        {...listProps}
        grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 4 }}
        renderItem={(item) => (
          <List.Item
            style={{
              border: "1px solid lightgrey",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "9px",
            }}
          >
            <div
              style={{
                padding: "0",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              <img
                src={item.image_path}
                alt="vehicle"
                style={{
                  width: "100%",
                  height: "auto",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <Text
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "19px",
                  padding: "0 16px",
                }}
              >
                {formatDate(item.timestamp)}
              </Text>
              <Text
                style={{
                  display: "block",
                  marginTop: "11px",
                  paddingBottom: "25px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                {item.reason}
              </Text>
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