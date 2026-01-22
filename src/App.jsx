import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import ToDoList from "./pages/todoList";
import MorningFlow from "./pages/morningFlow";
import Backlog from "./pages/backlog";
import AppLayout from "./pages/appLayout";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/todo-app/" element={<ToDoList />} />
          <Route path="/morning-flow" element={<MorningFlow />} />
          <Route path="/backlog" element={<Backlog />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;