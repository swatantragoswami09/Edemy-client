import { Tag } from "antd";

export const currencyFormatter = (data) => {
  let res = data.amount;
  res = res / 100; // convert into inr
  return "₹ " + res;
};

export const dateFormater = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const columns = [
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => {
      let color = status === "SUCCEEDED" ? "lightgreen" : "red";
      return (
        <Tag
          key={Math.random()}
          color={color}
          style={{ color: status === "SUCCEEDED" ? "black" : "white" }}
        >
          {status}
        </Tag>
      );
    },
  },
];
