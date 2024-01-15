import { Chatbox,Sidebar } from './components';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className="text-white flex ">
     <Sidebar/>
     <Chatbox/>
     <ToastContainer />
    </div>
  )
}

export default App