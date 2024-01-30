import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header'
import NewNote from './components/newNote'
import EditNote from './components/editNote'
import Main from './components/Main'
import ArchivedNotes from './components/archivedNotes'
import ViewNote from './components/viewNote'
import Settings from './components/settings'
import './App.css'

function App () {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/note/new" element={<NewNote/>}/>
            <Route path="/note/:idNote" element={<ViewNote/>}/>
            <Route path="/note/edit/:idNote" element={<EditNote/>}/>
            <Route path="/notes/archived" element={<ArchivedNotes/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
