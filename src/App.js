import './App.css';
import './style/code.css'
import CodeProvider from "./context/Code";
import CodeView from "./component/code/CodeView";
import CodeBulk from "./component/code/CodeBulk";


function App() {
  return (
    <div className="App">
      <CodeProvider>
          <CodeBulk/>
          <CodeView/>
      </CodeProvider>
    </div>
  );
}

export default App;
