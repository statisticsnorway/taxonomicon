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
import AuthProvider from "./context/Auth";
import ProtectedRoute from "./component/util/ProtectedRoute";
import {useState} from "react";

function App() {
  const [filter, setFilter] = useState('')
  return (
      <AuthProvider>
        <Router>
            <div className="App">
              <Routes>
                  <Route path={'/'}
                         element={<Frontpage/>}
                  />
                  <Route path={'/admin'}
                         element={
                             <ProtectedRoute><Layout><CodeListUpload/></Layout></ProtectedRoute>
                         }
                  />
                  <Route path={'/code'}
                         element={
                             <ProtectedRoute>
                                 <Layout>
                                  <CodeListProvider>
                                      <CodeProvider>
                                          <BulkCodeProvider>
                                              <CodeBulk setFilter={setFilter}/>
                                              <CodeView setFilter={setFilter} filter={filter}/>
                                          </BulkCodeProvider>
                                      </CodeProvider>
                                  </CodeListProvider>
                                </Layout>
                             </ProtectedRoute>
                        }
                  />
              </Routes>
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
