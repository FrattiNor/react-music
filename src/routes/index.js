
import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import menuGlobal from './router';

import Foot from '../components/index/foot'
  
function RouterConfig({ history, app }) {
 
  return (
    <div className="index">
    <Foot />
    <Router history={history}>
      <Switch>
          <Route path="/" exact render={() => (<Redirect to="/index" />)} />
          {
            menuGlobal.map(({path,...dynamics},index)=>(
              <Route
                key={index} 
                path={path} 
                exact 
                component={dynamic({
                  app,
                  ...dynamics
                })} 
              />
            ))
          }
      </Switch>
    </Router>
    </div>
  );
}
 
export default RouterConfig;
