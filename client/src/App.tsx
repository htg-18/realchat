import Chatbox from "./components/Chatbox"
import Sidebar from "./components/Sidebar"
import { ToastContainer, toast } from 'react-toastify';
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