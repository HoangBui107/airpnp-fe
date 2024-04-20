import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";


const BarChartBox = (props) => {
  return (
    <div className="w-full h-full ">
      <h1 className="text-lg sm:text-xl md:text-2xl mb-5 font-semibold" style={{ color: 'white' }}>{props.title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
