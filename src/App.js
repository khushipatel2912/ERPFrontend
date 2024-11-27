import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import ApplyPlacement from './components/ApplyPlacement';
import Offers from './components/Offers';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Login/></div>,
  },
  {
    path: "/apply/:offerId",
  element: <ApplyPlacement/>
  },
  {
    path: "/offers",
  element: <Offers/>
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;