import LoginPage from '@pages/Login';
import { Show, createSignal } from 'solid-js';
import { Toaster } from 'solid-toast';
import Dashboard from '@pages/Dashboard';

function App() {
  const [isLogin, setIsLogin] = createSignal<boolean>(false);

  // user is only created if there any login in login page
  const userFromLocalStorage = localStorage.getItem('user');

  if (userFromLocalStorage !== null) {
    setIsLogin(true);
  }

  return (
    <>
      <Show when={isLogin()} fallback={<LoginPage loginHook={setIsLogin} />}>
        <Dashboard />
      </Show>
      <Toaster position='bottom-right' />
    </>
  );
}

export default App;
