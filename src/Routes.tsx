import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repository from "./pages/Repository";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Main />} />
        <Route path="/repository/:repository" element={<Repository />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};
export default Routes;
