import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<div>Работает</div>}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  );
};

export default App;
