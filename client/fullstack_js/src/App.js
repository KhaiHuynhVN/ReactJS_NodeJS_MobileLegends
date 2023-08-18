import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Layout = route.layout;
                  const Path = route.path;
                  const Page = route.component;
                  return (
                     <Route
                        key={index}
                        path={Path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
