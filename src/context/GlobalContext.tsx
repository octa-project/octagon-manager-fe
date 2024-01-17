import React, {createContext} from "react";
import useLocalStorage from "@/src/hooks/useLocalStorage";
export const ThemeContext:any = createContext({
    theme: "light",
    setTheme: () => {}
})
export default {
    ThemeContext
};