import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Task1 from './pages/Task1';
import Task2 from './pages/Task2';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Task1} />
        <Route path='/task2' component={Task2} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
