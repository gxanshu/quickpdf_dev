import LoginPage from "@pages/Login"
import { useAdminChecker } from "@services/hooks";

function App() {
  const [admin] = useAdminChecker();

  console.log(admin())

  return (
    <>
    <h1 class="text-3xl font-bold underline text-red-500">
      Hello world!
    </h1>
    <LoginPage/>
    </> 
  );
}

export default App;
