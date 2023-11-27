import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/signin';
import Layout from './routes/Layout';

function App() {
  const token = localStorage.getItem('accessToken');
  const fname = localStorage.getItem('user')['fname'];
  const lname = localStorage.getItem('user')['lname'];
  const buasri_id = localStorage.getItem('user')['buasri_id'];


  if(!token) {
    return <SignIn />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout token={{name: fname + " " + lname, buasri_id: buasri_id}} />}>
          <Route index element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
