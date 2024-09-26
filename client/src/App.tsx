import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import React from "react";
import { LoadingContext } from "./contexts/loadingContext";
import { useAxios } from "./hooks/useAxios";


//where we create the instance of router to be used all over the application
const router = createRouter({
  routeTree,
  context: {
    axios: undefined!
  }
});

//we are extending the Register interface from the tanstack router module to include the router as a type of our router instance -- this establishes type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const [showLoading, setShowLoading] = React.useState(false);
  return (
    <LoadingContext.Provider value={{showLoading, setShowLoading}}> 
      <Main />
    </LoadingContext.Provider>
  );
};

const Main = () => {
  const axios = useAxios();
  return (
      <RouterProvider router={router} context={{ axios }} />
  );
};

export default App