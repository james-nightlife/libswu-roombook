import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Layout from './routes/Layout';
import Booking from './routes/Booking';

function App() {
  var user = localStorage.getItem('user');
  var room = localStorage.getItem('room');

  if(!user) {
    return <SignIn />
  }else{
    user = JSON.parse(user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/booking' element={<Booking user={user} room={room} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
