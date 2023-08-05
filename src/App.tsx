import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css';
import { ConfigProvider, Layout } from 'antd'
import Authentication from './Pages/Authentication'

const router = createBrowserRouter ([
  {
    // path: "/",
    // element: <Layout />,
    // children: [
    //   {
        path: "/authentication",
        element: <Authentication />
    //   }
    // ]
  }
])

function App() {
  return (
    <div className="dark container">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#EA7C69'
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
