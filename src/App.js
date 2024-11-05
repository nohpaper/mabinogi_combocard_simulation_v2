import Input from "./components/input";
import Custom from "./components/custom";
import {Route, Routes} from "react-router-dom";
//import {createBrowserRouter, RouterProvider, Routes} from "react-router-dom";

/*const router = createBrowserRouter([
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
]);*/

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<Input/>} errorElement={<p>Not Found</p>}/>
            <Route path={"/custom"} element={<Custom/>} errorElement={<p>Not Found</p>}/>
        </Routes>
        {/*<RouterProvider router={router}/>*/}
    </div>
  );
}

export default App;
