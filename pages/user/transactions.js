import React, { useState, useEffect, useContext } from "react";
import UserRoute from "../../components/routes/UserRoute";
import { Table, Tag } from "antd";
import axios from "axios";
import { currencyFormatter, columns, dateFormater } from "../../utils/helpers";
import { Context } from "../../context";

const Transaction = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  // console.log("user.user.courses", user.user.courses);
  useEffect(() => {
    const getTransactionDetails = async () => {
      try {
        const res = await axios.get("/api/all-transactions");
        const transactionsData = res.data.data.map((item) => ({
          course: "SKG course details",
          amount: currencyFormatter(item),
          created: new Date(item.created * 1000).toLocaleDateString(
            "en-IN",
            dateFormater
          ),
          status: item.status.toUpperCase(),
        }));
        setDataSource(transactionsData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };
    getTransactionDetails();
  }, []);

  // Check if the data is loaded before rendering
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Your Transactions</h1>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        // scroll={{
        //   y: 240,
        // }}
      />
    </UserRoute>
  );
};
export default Transaction;
