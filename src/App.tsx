import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/login" component={LoginPage}></Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
