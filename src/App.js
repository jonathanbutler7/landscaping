import LandingPage from './LandingPage/LandingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import CreateWorker from './CreateWorker/CreateWorker';
import OrderForm from './CreateOrder/OrderForm';
import { Route } from 'react-router-dom';
import { services } from './services';
import { LandscapingProvider } from './LandingPage/context';
console.log(services)
function App() {
  return (
    <LandscapingProvider>
      <Header />
      <Nav />
      <Route path='/worker' component={CreateWorker} />
      <Route path='/order' component={OrderForm} />
      {services.map((service, i) => (
        <Route key={i} path={`/${service.name}`}>
          {/* <LandingPage key={i} service={service} /> */}
          <div>hi</div>
        </Route>
      ))}
    </LandscapingProvider>
  );
}

export default App;
