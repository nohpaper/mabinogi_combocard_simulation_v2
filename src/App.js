import Input from "./components/input";
import Custom from "./components/custom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Input/>,
        errorElement:<p>Not Found</p>
    },
    {
        path: "/custom",
        element: <Custom/>,
        errorElement:<p>Not Found</p>
    },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
