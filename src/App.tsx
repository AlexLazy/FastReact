import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Proposals from './components/Proposals';
import Proposal from './components/Proposal';

import Page404 from './pages/404';
import Task1 from './pages/Task1';
import Task2 from './pages/Task2';
import Task4 from './pages/Task4';
import FlyingVehicleForm from './components/FlyingVehicleForm';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Task1} />
        <Route path={['/task2', '/task3']} component={Task2} />
        <Route path='/task4' component={Task4} />
        <Route exact path='/proposals' component={Proposals} />
        <Route exact path='/proposals/:id' component={Proposal} />
        <Route
          path={['/proposals/:id/edit', '/proposal']}
          component={FlyingVehicleForm}
        />
        <Route path='**' component={Page404} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
