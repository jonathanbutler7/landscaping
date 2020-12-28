import LandingPage from './LandingPage/LandingPage';
import Header from './components/Header';
import Nav from './components/Nav';
import { Route } from 'react-router-dom';
import { services } from './services';

function App() {
  return (
    <div>
      <Header />
      <Nav />
      {services.map((service, i) => (
        <Route key={i} path={`/${service.name}`}>
          <LandingPage key={i} service={service} />
        </Route>
      ))}
    </div>
  );
}

export default App;
