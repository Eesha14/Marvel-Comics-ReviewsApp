import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';

import Search from './components/Search/Search.js';
import Gallery from  './components/Gallery/Gallery.js';
import Detail from './components/Detail/Detail.js';

class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
              {/* <ul className="App-header">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul> */}
           <Routes>
                <Route exact path='/about' element={< About />}></Route>

                <Route exact path="/" element={<Search />}/>
                <Route exact path="/gallery" element={<Gallery />}/>
                <Route exact path="/char/:id" element={<Detail />}/>
                {/* <Route exact path="*" element={<Detail />}/> */}
          </Routes>
          </div>
       </Router>
   );
  }
}

export default App;
