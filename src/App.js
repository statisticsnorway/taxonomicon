import './App.css';
import './style/code.css'
import './style/header.css'
import CodeProvider, {BulkCodeProvider, CodeListProvider} from "./context/Code";
import CodeView from "./component/code/CodeView";
import CodeBulk from "./component/code/CodeBulk";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import CodeListUpload from "./component/admin/CodeListUpload";
import Frontpage from "./component/Frontpage";
import Layout from "./component/util/Layout";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path={'/'}
                 element={<Frontpage/>}
          />
          <Route path={'/admin'}
                 element={
                     <Layout><CodeListUpload/></Layout>
                 }
          />
          <Route path={'/code'}
                 element={
                     <Layout>
                      <CodeListProvider>
                          <CodeProvider>
                              <BulkCodeProvider>
                                  <CodeBulk/>
                                  <CodeView/>
                              </BulkCodeProvider>
                          </CodeProvider>
                      </CodeListProvider>
                     </Layout>
                }
          />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
