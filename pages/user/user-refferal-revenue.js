import React from "react";
import UserRoute from "../../components/routes/UserRoute";
import { Card } from "antd";

function userRefferalRevenue() {
  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">🤑 Your Refferal Revenue</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Card title="🌟 Your Income 🌟" bordered={false} style={{ width: 300 }}>
          <h3>Your Income</h3>
        </Card>
        <Card
          title="🌟 Your Course Income 🌟"
          bordered={false}
          style={{ width: 300 }}
        >
          <h3>Your Course Income</h3>
        </Card>
        <Card title="🌟 Your Income 🌟" bordered={false} style={{ width: 300 }}>
          <h3>Your Income</h3>
        </Card>
      </div>
    </UserRoute>
  );
}

export default userRefferalRevenue;
