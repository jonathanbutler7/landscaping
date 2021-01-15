import LandingPage from './LandingPage/LandingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import CreateWorker from './CreateWorker/CreateWorker';
import OrderForm from './CreateOrder/OrderForm';
import { Route } from 'react-router-dom';
import { services } from './services';
import { LandscapingProvider } from './LandingPage/context';

function App() {
  return (
    <LandscapingProvider>
      <Header />
      <Nav />
      <Route path='/worker' component={CreateWorker} />
      <Route path='/order' component={OrderForm} />
      {services.map((service, i) => (
        <Route key={i} path={`/${service.name}`}>
          <LandingPage key={i} service={service} />
        </Route>
      ))}
    </LandscapingProvider>
  );
}

export default App;
