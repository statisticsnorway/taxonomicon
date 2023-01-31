import './App.css';
import CodeProvider from "./context/Code";
import CodeView from "./component/code/CodeView";
import Bulk from "./component/code/Bulk";

function App() {
  return (
    <div className="App">
      <CodeProvider>
          <Bulk/>
        <CodeView/>
      </CodeProvider>
    </div>
  );
}

export default App;
