import React from "react";

export type TLoadingContext = {
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = React.createContext<TLoadingContext | null>(null)