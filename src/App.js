import LandingPage from './LandingPage/LandingPage';
import Header from './components/Header';
import { services } from './services';

function App() {
  return (
    <div>
      <Header />
      {services.map((service, i) => (
        <LandingPage key={i} service={service} />
      ))}
    </div>
  );
}

export default App;
