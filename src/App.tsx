import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import AuthPage from '@views/authPage/AuthPage';
import RequireAuth from '@components/common/requireAuth/RequireAuth';
import OrdersContent from '@components/containers/ordersContent/OrdersContent';

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
                <OrdersContent />
              </RequireAuth>
            }
          />
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
