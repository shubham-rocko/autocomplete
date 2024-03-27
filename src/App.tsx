import { Profiler, useEffect   } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import AutoComplete from './auto-complete'
import Table from './table';

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    window.addEventListener('online', function (e) {
      console.log(e);
    })
  }, []);
  const callback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    })
  }

  const methodDoesNotExist = () => {
    console.error("Method not exist called")
  }

  return (
    <>
      <AutoComplete />
      <Profiler  id="AppComponent" onRender={callback}>
        <QueryClientProvider client={queryClient}>
          <Table />
        </QueryClientProvider>
        <button onClick={() => methodDoesNotExist()}>Break the world</button>;
      </Profiler> 
    </>
  )
}

export default App;
