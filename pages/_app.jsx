import "@/styles/landing.css"
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { AuthContextProvider } from "@/contexts/authContext";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";

const noAuthRequired = ["/login", "/signup","/","/eventPage"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) || router.pathname.startsWith("/event/")? (
          <>
            <Component {...pageProps} />
          </>
        ) : (
          <ProtectedRoute>
            <>
              <Component {...pageProps} />
            </>
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </>
  );
}
