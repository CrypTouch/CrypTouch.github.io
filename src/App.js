import Header from './Header.js';
import ExchangeMech from './exchangeMech.js';
import FinalScreen from './FinalScreen.js'
import Footer from './Footer.js';
import Main from './Main.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ExchangeMech />
      <Main />
      <Footer />
      <FinalScreen />
    </div>
  );
}

export default App;
