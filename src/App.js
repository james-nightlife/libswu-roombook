import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/home';
import SignIn from './routes/signin';

function App() {
  const token = localStorage.getItem('accessToken');
  localStorage.setItem('session', false);

  if(!token) {
    return <SignIn />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
