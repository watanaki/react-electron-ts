import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

type baseChartProps = {
  data: { value: number | undefined }[];
  fill: string;
  stroke: string;
}

export function BaseChart(props: baseChartProps) {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <AreaChart data={props.data}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" fill="#1C1C1C" />
        <Area
          fillOpacity={1}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
}