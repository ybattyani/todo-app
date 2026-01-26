import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/appLayout";
import MainPage from "./pages/mainPage";
import ToDoList from "./pages/todoListPage";
import MorningFlow from "./pages/morningFlowPage";
import Backlog from "./pages/backlogPage";
import Today from "./pages/todayPage";
import GroceryPage from "./pages/groceryPage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/todo-app" element={<MainPage />} />
          <Route path="/todo-app/todoList" element={<ToDoList />} />
          <Route path="/todo-app/morning-flow" element={<MorningFlow />} />
          <Route path="/todo-app/backlog" element={<Backlog />} />
          <Route path="/todo-app/today" element={<Today />} />
          <Route path="/todo-app/grocery" element={<GroceryPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
