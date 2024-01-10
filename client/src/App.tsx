import Chatbox from "./components/Chatbox"
import Sidebar from "./components/Sidebar"


function App() {
  return (
    <div className="text-white flex">
     <Sidebar/>
     <Chatbox/>
    </div>
  )
}

export default App