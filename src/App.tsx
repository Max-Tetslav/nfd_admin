import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import AuthPage from '@views/authPage/AuthPage';
import AdminPage from '@views/adminPage/AdminPage';
import RequireAuth from '@components/common/requireAuth/RequireAuth';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<AuthPage />} />
          <Route
            path="/admin/orders"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
