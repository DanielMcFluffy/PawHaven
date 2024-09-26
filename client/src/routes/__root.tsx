import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toast } from "../components/Toast";
import { Loading } from "../components/Loading";
import { LoadingContext } from "../contexts/loadingContext";
import React from "react";
import { useAxios } from "../hooks/useAxios";

export type MyRouterContext = {
    axios: ReturnType<typeof useAxios>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {

  const showLoading = React.useContext(LoadingContext)!.showLoading;

  return(
    <>
      {false && <Toast />}
      <Loading showLoading={showLoading} />
      <Outlet />
    </>
  )
}
