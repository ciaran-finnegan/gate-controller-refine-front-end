import React, { useMemo } from "react";
import { useList, HttpError } from "@refinedev/core";
import { Row, Col, Card, Typography, Spin, Statistic, DatePicker, ConfigProvider } from "antd";
import { Bar, Line, Pie } from "@ant-design/plots";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const capitalize = (str: string) => {
  if (!str) return "Unknown";
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<[Dayjs, Dayjs]>([
    dayjs().subtract(365, 'days'),
    dayjs()
  ]);

  const { data, isLoading, error } = useList({
    resource: "log",
    filters: [
      {
        field: "timestamp",
        operator: "gte",
        value: dateRange[0].toISOString(),
      },
      {
        field: "timestamp",
        operator: "lte",
        value: dateRange[1].toISOString(),
      },
    ],
    pagination: { mode: "off" },
  });

  const logs = useMemo(() => data?.data ?? [], [data]);

  const statistics = useMemo(() => {
    if (logs.length === 0) return {};

    const userCounts = logs.reduce((acc: Record<string, number>, log) => {
      if (log.vehicle_registered_to_name) {
        const userName = capitalize(log.vehicle_registered_to_name);
        acc[userName] = (acc[userName] || 0) + 1;
      }
      return acc;
    }, {});

    const mostCommonUser = Object.entries(userCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    const uniqueVehicles = new Set(logs.map(log => log.plate_number)).size;

    const totalEntries = logs.length;

    const daysInRange = dateRange[1].diff(dateRange[0], 'days') + 1;
    const averageEntriesPerDay = totalEntries / daysInRange;

    return {
      mostCommonUser,
      uniqueVehicles,
      totalEntries,
      averageEntriesPerDay: averageEntriesPerDay.toFixed(2),
    };
  }, [logs, dateRange]);

  const chartData = useMemo(() => {
    if (logs.length === 0) return {};

    // User Distribution
    const userDistribution = logs.reduce((acc: Record<string, number>, log) => {
      if (log.vehicle_registered_to_name) {
        const userName = capitalize(log.vehicle_registered_to_name);
        acc[userName] = (acc[userName] || 0) + 1;
      }
      return acc;
    }, {});

    const userChartData = Object.entries(userDistribution)
      .map(([user, count]) => ({
        user,
        count,
      }));

    // Entries by Time of Day
    const timeOfDayDistribution = logs.reduce((acc: Record<number, number>, log) => {
      const hour = dayjs(log.timestamp).hour();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    const timeOfDayChartData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: timeOfDayDistribution[i] || 0,
    }));

    // Daily Entries Over Time
    const dailyEntries = logs.reduce((acc: Record<string, number>, log) => {
      const date = dayjs(log.timestamp).format("YYYY-MM-DD");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const dailyChartData = Object.entries(dailyEntries).map(([date, count]) => ({
      date,
      count,
    }));

    // Access Frequency by User
    const userFrequency = logs.reduce((acc: Record<string, number>, log) => {
      if (log.vehicle_registered_to_name) {
        const userName = capitalize(log.vehicle_registered_to_name);
        acc[userName] = (acc[userName] || 0) + 1;
      }
      return acc;
    }, {});

    const userFrequencyChartData = Object.entries(userFrequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      userChartData,
      timeOfDayChartData,
      dailyChartData,
      userFrequencyChartData,
    };
  }, [logs]);

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error loading data: {(error as HttpError).message}</div>;
  }

  return (
    <ConfigProvider>
      <div style={{ padding: "24px" }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <Title level={2}>Gate Access Analytics Dashboard</Title>
          </Col>
          <Col>
            <RangePicker
              value={dateRange}
              onChange={(dates) => {
                if (dates) {
                  setDateRange(dates as [Dayjs, Dayjs]);
                }
              }}
              allowClear={false}
              defaultPickerValue={[dayjs().subtract(90, 'days'), dayjs()]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Entries" value={statistics.totalEntries} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Unique Vehicles" value={statistics.uniqueVehicles} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Most Common User" value={statistics.mostCommonUser} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Avg. Entries per Day" value={statistics.averageEntriesPerDay} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="User Distribution">
              <Pie
                data={chartData.userChartData}
                angleField="count"
                colorField="user"
                radius={0.8}
                label={{
                  type: 'outer',
                  content: '{name} {percentage}',
                }}
                interactions={[{ type: 'element-active' }]}
                tooltip={{
                  formatter: (datum: { user: string, count: number }) => ({ name: datum.user, value: datum.count }),
                }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Entries by Time of Day">
              <Line
                data={chartData.timeOfDayChartData}
                xField="hour"
                yField="count"
                xAxis={{
                  title: { text: 'Hour of Day' },
                  tickCount: 24,
                  label: {
                    formatter: (text: string) => `${text}h`,
                  },
                }}
                yAxis={{
                  title: { text: 'Number of Entries' },
                }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Daily Entries Over Time">
              <Line
                data={chartData.dailyChartData}
                xField="date"
                yField="count"
                xAxis={{
                  type: 'time',
                  title: { text: 'Date' },
                }}
                yAxis={{
                  title: { text: 'Number of Entries' },
                }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Top 10 Users by Access Frequency">
              <Bar
                data={chartData.userFrequencyChartData?.filter((item) => item.name !== "Unknown")}
                xField="name"
                yField="count"
                seriesField="name"
                label={{
                  position: 'middle',
                  style: {
                    fontSize: 12,
                  },
                }}
                legend={{
                  position: 'top-left',
                  text: {
                    style: {
                      fontSize: 14,
                    },
                  },
                }}
                xAxis={{
                  title: { text: 'User' },
                  label: {
                    style: {
                      fontSize: 12,
                    },
                  },
                }}
                yAxis={{
                  title: { text: 'Number of Entries' },
                  label: {
                    style: {
                      fontSize: 12,
                    },
                  },
                }}
                barStyle={{
                  radius: [2, 2, 0, 0],
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default Analytics;