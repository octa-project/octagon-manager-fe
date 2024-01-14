"use client";
import {useContext, useEffect} from "react";
import useLocalStorage from "./useLocalStorage";
import {ThemeContext} from "../context/GlobalContext";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  const themeContext:any = useContext(ThemeContext);
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    themeContext.setTheme(colorMode);
    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
