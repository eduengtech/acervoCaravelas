import { AuthProvider } from "./auth/AuthProvider";
import { AppRouters } from "./Routers/AppRouters";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouters />
      </AuthProvider>
    </>
  );
}

export default App;
