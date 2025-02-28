import { useEffect, useState } from 'react'
import './App.css'
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';

function App() {
  const statistics = useStatistics(50);
  const staticData = useStaticData();
  const [view, setView] = useState<View>('CPU');

  function getUsage(view: View) {
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
      <Header />
      <div className='main'>
        <div>
          <SelectOption title='CPU' subTitle={staticData?.cpuModel ?? ''} data={getUsage('CPU')} onClick={() => { setView('CPU') }} />
          <SelectOption title='RAM' subTitle={`${staticData?.totalMemoryInGB ?? ''} GB`} data={getUsage('RAM')} onClick={() => { setView('RAM') }} />
          <SelectOption title='STORAGE' subTitle={`${staticData?.totalStorage ?? ''} GB`} data={getUsage('STORAGE')} onClick={() => { setView('STORAGE') }} />
        </div>
        <div className='mainGrid'>
          <Chart data={getUsage(view)} maxDataPoints={50} selectedView={view} />
        </div>
      </div>
    </>
  )
}

function Header() {
  return (
    <header>
      <button id='close' onClick={() => window.electron.sendFrameAction("close")} />
      <button id='minimize' onClick={() => window.electron.sendFrameAction("minimize")} />
      <button id='maximize' onClick={() => window.electron.sendFrameAction("maximize")} />
    </header>
  )
}

type SelectOptionProps = {
  title: string;
  subTitle: string;
  data: number[];
  onClick: () => void;
}

function SelectOption(selectProps: SelectOptionProps) {
  return <button className='selectOption' onClick={selectProps.onClick}>
    <div className='selectOptionTitle'>
      <div>{selectProps.title}</div>
      <div>{selectProps.subTitle}</div>
    </div>
    <div className='selectOptionChart'>
      <Chart data={selectProps.data} maxDataPoints={50} selectedView={selectProps.title as 'CPU' | 'RAM' | 'STORAGE'} />
    </div>
  </button>
}

function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    window.electron.getStaticData().then((data) => setStaticData(data))
  }, [])
  return staticData;
}

export default App
