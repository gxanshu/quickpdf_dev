import LoginPage from '@pages/Login';
import { Show, createSignal } from 'solid-js';

function App() {
  const [isLogin, setIsLogin] = createSignal<boolean>(false);

  // user is only created if there any login in login page
  const userFromLocalStorage = localStorage.getItem('user');

  if (userFromLocalStorage !== null) {
    setIsLogin(true);
  }

  return (
    <Show when={isLogin()} fallback={<LoginPage loginHook={setIsLogin} />}>
      <p>Loged in</p>
    </Show>
  );
}

export default App;
