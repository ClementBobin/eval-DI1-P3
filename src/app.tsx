import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from './pages/not-found';
import { Unauthorized } from './pages/unauthorized';
import Loading from './pages/loading';
import { AuthProvider } from '@/contexts/auth-context';
import { Login } from './pages/login';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          } />

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
    </AuthProvider>
  );
}

export default App;