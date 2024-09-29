import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toast } from "../components/Toast";
import { Loading } from "../components/Loading";
import React from "react";
import { useAxios } from "../hooks/useAxios";
import { BaseContext } from "../contexts/baseContext";
import { useCookies } from "react-cookie";

export type MyRouterContext = {
    axios: ReturnType<typeof useAxios>
    cookie: ReturnType<typeof useCookies>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {

  const showLoading = React.useContext(BaseContext)!.showLoading;

  return(
    <>
      {false && <Toast />}
      <Loading showLoading={showLoading} />
      <Outlet />
    </>
  )
}
