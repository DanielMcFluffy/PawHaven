import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";


//where we create the instance of router to be used all over the application
const router = createRouter({
  routeTree,
  context: { authentication: undefined! }, //after defining the authentication context type in root, add the context field in this way for initial setup/stage of the application
});

//we are extending the Register interface from the tanstack router module to include the router as a type of our router instance -- this establishes type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <RouterProvider 
      router={router}
    />
  )
}

export default App