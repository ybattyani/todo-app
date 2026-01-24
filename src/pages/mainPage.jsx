import { MainNavButton } from "../elements/NavButton";
import './mainPage.css';

export default function MainPage() {
  return (
    <div className="page">
      <h1>Main Page</h1>
      <p>Welcome!! <br/>In this app you will be able to manage your tasks and routines</p>
      <MainNavButton />
    </div>
  );
}