import { Routes, Route, Link } from 'react-router-dom'

import CartPage from '../../pages/CartPage/CartPage'
import CatalogPage from '../../pages/CatalogPage/CatalogPage'
import ChatsPage from '../../pages/ChatsPage/ChatsPage'
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage'
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ProductPage from '../../pages/ProductPage/ProductPage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'

function App() {
    return(
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/CartPage' element={<CartPage />}/>
            <Route path='/CatalogPage' element={<CatalogPage />}/>
            <Route path='/ChatsPage' element={<ChatsPage />}/>
            <Route path='/FavoritesPage' element={<FavoritesPage />}/>
            <Route path='/ProductPage' element={<ProductPage />}/>
            <Route path='/LoginPage' element={<LoginPage />}/>
            <Route path='/ProfilePage' element={<ProfilePage />}/>
            <Route path='/RegisterPage' element={<RegisterPage />}/>
        </Routes>
    )
}

export default App