import { BaseChart } from "./baseChart";

type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: 'CPU' | 'RAM' | 'STORAGE';
}

export const COLOR_MAP = {
  CPU: { fill: '#0a4d5c', stroke: '#5dd4ee' },
  RAM: { fill: '#5f3c07', stroke: '#e99311' },
  STORAGE: { fill: '#0b5b22', stroke: '#1acf4d' },
}

export function Chart(props: ChartProps) {
  const color = COLOR_MAP[props.selectedView];
  const points = props.data.map(point => ({ value: point * 100 }));
  const temp = [...points, ...Array(props.maxDataPoints - points.length)];
  return <BaseChart data={temp} fill={color.fill} stroke={color.stroke} />
}