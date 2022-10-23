import './App.css';
import { BrowserRouter as Router,  Routes, Route
} from 'react-router-dom';
import React, { Component } from 'react';

import Search from './components/Search/Search.js';
import Gallery from  './components/Gallery/Gallery.js';
import Detail from './components/Detail/Detail.js';
import Detail_Event from './components/Detail_Event/Detail_Event';

class App extends Component {
  render() {
    return (
       <Router basename={process.env.PUBLIC_URL}>
           <div className="App">
           <Routes>
                <Route exact path="/" element={<Search />}/>
                <Route exact path="/gallery" element={<Gallery />}/>
                <Route exact path="/char/:id" element={<Detail />}/>
                <Route exact path="/gallerychar/:id" element={<Detail_Event />}/>
          </Routes>
          </div>
       </Router>
   );
  }
}

export default App;
