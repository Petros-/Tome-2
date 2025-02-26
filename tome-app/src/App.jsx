import { useState } from 'react';
import './App.css';
import TopNav from './TopNav';
import Home from './Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ArtworkDetails from './ArtworkDetails';
import NewArtwork from './NewArtwork';
import EditArtwork from './EditArtwork';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <TopNav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
        <Route path="/new" element={<NewArtwork />} />
        <Route path="/edit/:id" element={<EditArtwork />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
