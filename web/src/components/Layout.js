import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";

import { Navbar } from "./Navbar";

export const Layout = () => {

   return (

      <>
         <Navbar />
         <main id="App">
            <Outlet />
         </main>
         <Footer />
      </>

   );

};
