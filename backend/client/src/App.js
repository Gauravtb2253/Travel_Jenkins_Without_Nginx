import './App.css';
import Login from './components/Login';
import Signin from './components/Signin';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { UserContextProvider } from './Usercontext';
import Account from './components/Account';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ViewProfile from './components/ViewProfile';
import UpdateProfile from './components/UpdateProfile';
import ShowPreviousItineraries from './components/ShowPreviousItineraries';

function App() {
  return (
    <div>
      <UserContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/view-profile" element={<ViewProfile />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/show-itineraries" element={<ShowPreviousItineraries />} />
              <Route path="/generate-itinerary" element={<Account />} />
            </Route>
          </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
