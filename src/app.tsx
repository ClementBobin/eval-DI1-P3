import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from './pages/not-found';
import { Unauthorized } from './pages/unauthorized';
import Loading from './pages/loading';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/unauthorized" element={
          <Suspense fallback={<Loading />}>
            <Unauthorized />
          </Suspense>
        } />
            
        <Route path="*" element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;