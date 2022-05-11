import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import AuthPage from '@views/authPage/AuthPage';
import AdminPage from '@views/adminPage/AdminPage';
import RequireAuth from '@components/common/requireAuth/RequireAuth';
import TableOrders from '@components/containers/tableOrders/TableOrders';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<AuthPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          >
            <Route path="orders" element={<TableOrders />} />
            <Route path="cars" />
            <Route path="categories" />
            <Route path="points" />
            <Route path="rates" />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
