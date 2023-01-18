import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Profil from './pages/Profil';
import PrivateRoute from './utils/routing';
import { store } from './utils/store';
import './style/index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<PrivateRoute><Profil/></PrivateRoute>}/>
                <Route path="/*" element={<h1>404 Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);
