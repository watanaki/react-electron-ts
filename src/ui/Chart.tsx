import { BaseChart } from "./baseChart";

type ChartProps = {
  data: number[];
  maxDataPoints: number;
}

export function Chart(props: ChartProps) {
  const points = props.data.map(point => ({ value: point * 100 }));
  const temp = [...points, ...Array(props.maxDataPoints - points.length)];
  return <BaseChart data={temp} />
}