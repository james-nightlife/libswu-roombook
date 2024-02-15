import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Layout from './pages/Layout';
import Booking from './pages/Booking';
import BookingAdmin from './pages/Booking_Admin';
import BookingCheck from './pages/Booking_Check';
import UserManager from './pages/UserManager';
import AdminAddUser from './pages/AdminAddUser';
import AdminEditUser from './pages/AdminEditUser';

function App() {
  var token = sessionStorage.getItem('username');

  if(!token) {
    return <SignIn />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/booking' element={<Booking />} />
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
