import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';

function App() {
  const statistics = useStatistics(50);
  const [count, setCount] = useState(0);
  const [view, setView] = useState<View>('CPU');

  function getUsage() {
    switch (view) {
      case 'CPU':
        return statistics.map((stat) => stat.cpuUsage);
      case 'RAM':
        return statistics.map((stat) => stat.ramUsage);
      case 'STORAGE':
        return statistics.map((stat) => stat.storageUsage);
      default:
        return statistics.map((stat) => stat.cpuUsage);
    }
  }

  useEffect(() => {
    return window.electron.subscribeViewChange((view) => {
      setView(view);
    });
  }, []);

  return (
    <>
      <div style={{ height: 120 }}>
        <Chart data={getUsage()} maxDataPoints={50} />
      </div>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
