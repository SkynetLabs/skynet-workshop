// Logo
import logo from "./skynet_logo.svg";
// css
import "./loading.css";

// Loading is a loading screen
const Loading = () => {
  return (
    <>
      <p>Loading...</p>
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
};

export { Loading };
