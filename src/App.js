import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Layout from './routes/Layout';
import Booking from './routes/Booking';
import BookingAdmin from './routes/Booking_Admin';
import BookingCheck from './routes/Booking_Check';
import UserManager from './routes/UserManager';
import AdminAddUser from './routes/AdminAddUser';
import AdminEditUser from './routes/AdminEditUser';

function App() {
  var user = sessionStorage.getItem('user');
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
          <Route path='/admin' element={<BookingAdmin />} />
          <Route path='/check' element={<BookingCheck />} />
          <Route path='/admin/users' element={<UserManager />} />
          <Route path='/admin/users/add' element={<AdminAddUser />} />
          <Route path='/admin/users/edit' element={<AdminEditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
