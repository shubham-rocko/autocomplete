import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import AutoComplete from './auto-complete'
import Table from './table';
import * as Sentry from "@sentry/react";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    window.addEventListener('online', function (e) {
      console.log(e);
    });

    window.onerror(() => {
      Sentry.init({
        dsn: "https://b50aabfa86a104b4de78847c2f43771a@o4506983632732160.ingest.us.sentry.io/4506983679524864",
      })
    });
  }, []);

  const methodDoesNotExist = () => {
    console.error("Method not exist called", test)
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
