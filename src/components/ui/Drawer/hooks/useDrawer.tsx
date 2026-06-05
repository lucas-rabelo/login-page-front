import { useState } from "react";

export function useDrawer() {
  const [drawerState, setDrawerState] = useState<boolean>(false);

  function handleCloseDrawer() {
    setDrawerState(false);
  }

  function handleOpenDrawer() {
    setDrawerState(true);
  }

  return {
    drawerState,
    handleCloseDrawer,
    handleOpenDrawer
  };
}