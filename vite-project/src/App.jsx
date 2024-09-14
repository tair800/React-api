
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CategoryPage from './pages/Home'
import CategoryDetail from './pages/Detail'
import MainLayout from './layout/MainLayout'
import Products from './pages/Products'
import About from './pages/About'
import Slider from './pages/Slider'
import Contact from './pages/Contact'

function App() {



  return (
    <>
    <Routes>
      <Route element={<MainLayout/>}>

      <Route path='/' element={<CategoryPage/>}></Route>
      <Route path='/detail/:id' element={<CategoryDetail/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/slider' element={<Slider/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>

      </Route>
    </Routes>
    </>
  )
}

export default App
