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
import AdminError from '@components/common/adminError/AdminError';
import AddCategory from '@components/containers/tableCategory/addCategory/AddCategory';
import AddCity from '@components/containers/tableCity/addCity/AddCity';
import AddPoint from '@components/containers/tablePoints/addPoint/AddPoint';
import AddRate from '@components/containers/tableRates/addRate/AddRate';
import AddOrderStatus from '@components/containers/tableOrderStatus/addOrderStatus/AddOrderStatus';
import EditCity from '@components/containers/tableCity/editCity/EditCity';
import EditOrderStatus from '@components/containers/tableOrderStatus/editOrderStatus/EditOrderStatus';
import EditRate from '@components/containers/tableRates/editRate /EditRate';
import EditPoint from '@components/containers/tablePoints/editPoint/EditPoint';
import EditCategory from '@components/containers/tableCategory/editCategory/EditCategory';
import AddCar from '@components/containers/tableCars/addCar/AddCar';
import EditCar from '@components/containers/tableCars/editCar/EditCar';
import AddRateType from '@components/containers/tableRateType/addRateType/AddRateType';
import TableRateType from '@components/containers/tableRateType/TableRateType';
import EditRateType from '@components/containers/tableRateType/editRateType/EditRateType';
import EditOrder from '@components/containers/tableOrders/editOrder/EditOrder';

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
            <Route path="order">
              <Route index element={<TableOrders />} />
              <Route path=":id" element={<EditOrder />} />
            </Route>
            <Route path="car">
              <Route index element={<TableCars />} />
              <Route path="add" element={<AddCar />} />
              <Route path=":id" element={<EditCar />} />
            </Route>
            <Route path="category">
              <Route index element={<TableCategory />} />
              <Route path="add" element={<AddCategory />} />
              <Route path=":id" element={<EditCategory />} />
            </Route>
            <Route path="city">
              <Route index element={<TableCity />} />
              <Route path="add" element={<AddCity />} />
              <Route path=":id" element={<EditCity />} />
            </Route>
            <Route path="point">
              <Route index element={<TablePoints />} />
              <Route path="add" element={<AddPoint />} />
              <Route path=":id" element={<EditPoint />} />
            </Route>
            <Route path="rate">
              <Route index element={<TableRates />} />
              <Route path="add" element={<AddRate />} />
              <Route path=":id" element={<EditRate />} />
            </Route>
            <Route path="tariffType">
              <Route index element={<TableRateType />} />
              <Route path="add" element={<AddRateType />} />
              <Route path=":id" element={<EditRateType />} />
            </Route>
            <Route path="status">
              <Route index element={<TableOrderStatus />} />
              <Route path="add" element={<AddOrderStatus />} />
              <Route path=":id" element={<EditOrderStatus />} />
            </Route>
            <Route path="*" element={<AdminError code={404} />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
