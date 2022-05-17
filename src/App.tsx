import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import AuthPage from '@views/authPage/AuthPage';
import AdminPage from '@views/adminPage/AdminPage';
import RequireAuth from '@components/common/requireAuth/RequireAuth';
import TableOrders from '@components/containers/tableOrders/TableOrders';
import TableCity from '@components/containers/tableCity/TableCity';
import TableCars from '@components/containers/tableCars/TableCars';
import TableCategory from '@components/containers/tableCategory/TableCategory';
import TableRates from '@components/containers/tableRates/TableRates';
import TablePoints from '@components/containers/tablePoints/TablePoints';
import TableOrderStatus from '@components/containers/tableOrderStatus/TableOrderStatus';

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
            <Route path="order" element={<TableOrders />} />
            <Route path="car" element={<TableCars />} />
            <Route path="category" element={<TableCategory />} />
            <Route path="city" element={<TableCity />} />
            <Route path="point" element={<TablePoints />} />
            <Route path="rate" element={<TableRates />} />
            <Route path="status" element={<TableOrderStatus />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
