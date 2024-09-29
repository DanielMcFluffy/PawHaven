import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useAxios } from "../hooks/useAxios";
import { useCookies } from "react-cookie";

export type MyRouterContext = {
    axios: ReturnType<typeof useAxios>
    cookie: ReturnType<typeof useCookies>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {

  return(
    <>
      <Outlet />
    </>
  )
}
