import { AuthProvider } from "../context/AuthContext";

export function Provider({ children }) {
    return(
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}