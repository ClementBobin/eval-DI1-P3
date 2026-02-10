import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';
import { AuthProvider } from '@/contexts/auth-context';
import { Unauthorized } from '@/pages/unauthorized';
import { Login } from './pages/login/login';
import './app.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login />
          } />

          <Route path="/unauthorized" element={
            <Unauthorized />
          } />
              
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;