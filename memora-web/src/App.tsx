import './App.css';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='font-poppins'>
      <Toaster />
      <Outlet />
    </div>
  );
}

export default App;