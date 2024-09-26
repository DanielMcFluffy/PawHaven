import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toast } from "../components/Toast";
import { Loading } from "../components/Loading";
import { LoadingContext } from "../contexts/loadingContext";
import React from "react";

export const Route = createRootRoute({
  component: Root,
})

function Root() {

  const [showLoading, setShowLoading] = React.useState(false)

  return(
    <>
    <LoadingContext.Provider value={{
      showLoading,
      setShowLoading,
    }}>
      {false && <Toast />}
      <Loading showLoading={showLoading} />
      <Outlet />
    </LoadingContext.Provider>
    </>
  )
}
