import { useEffect } from 'react';
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

  const methodDoesNotExist = () => {
    console.error("Method not exist called")
  }

  return (
    <>
      <AutoComplete />
      {/* <Profiler  id="AppComponent" onRender={callback}> */}
        <QueryClientProvider client={queryClient}>
          <Table />
        </QueryClientProvider>
        <button onClick={() => methodDoesNotExist()}>Break the world</button>
      {/* </Profiler>  */}
    </>
  )
}

export default App;
