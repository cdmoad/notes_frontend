
import './App.css';
import Home from './components/home/home'
import Makenote  from './components/makenote/makenote';
import Seenote from './components/seenote/seenote';
import Signup  from './components/signup/signup';
import Login from './components/login/login'
import Contact from './components/contact/contact'
import Admin from './components/admin/admin'
import Profile from './components/profile/profile'
import Notfoundpage from './components/notfoundpage/notfoundpage'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
    
    <div className="App">

     <Router>

      <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/makenote" element={<Makenote/>}/>
      <Route  path="/seenote" element={<Seenote/>}/>
      <Route  path="/signup" element={<Signup/>}/>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/contact" element={<Contact/>}/>
      <Route  path="/admino" element={<Admin/>}/>
      <Route  path="/profile" element={<Profile/>}/>
      <Route  path="*" element={<Notfoundpage/>}/>
      
      </Routes>
     </Router>
    </div>

    </>
  );
}

export default App;
