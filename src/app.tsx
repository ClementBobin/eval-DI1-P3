import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';
import { AuthProvider } from '@/contexts/auth-context';
import { Unauthorized } from '@/pages/unauthorized';
import { Login } from './pages/login/login';
import { ProtectedRoute } from '@/components/protected-route';
import './app.css';
import { ContractsList } from './pages/contracts/list';
import { ContractDetail } from './pages/contracts/[id]';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login redirectTo='/contracts' />
          } />

          <Route path="/contracts" element={
            <ProtectedRoute>
              <ContractsList />
            </ProtectedRoute>
          } />

          <Route path="/contracts/:id" element={
            <ProtectedRoute>
              <ContractDetail />
            </ProtectedRoute>
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