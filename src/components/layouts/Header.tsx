import { BackIcon, SunIcon, AddUserIcon, EditUserIcon, LockIcon } from '@components/Icons';
import { Heading, Container, SecondryButton } from '@components/ui';
import { useAdminChecker } from '@services/hooks';
import { useNavigate } from '@solidjs/router';
import { Component, Show, createSignal, mergeProps } from 'solid-js';

const Header: Component<{
  isBack: boolean;
}> = (props) => {
  const merged = mergeProps({ isBack: false }, props);
  const [visible, setVisible] = createSignal(false)
  const navigate = useNavigate()
  const [isAdmin] = useAdminChecker()

  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav class='relative bg-white shadow dark:bg-gray-800'>
      <Container class='py-3'>
        <div class='lg:flex lg:items-center lg:justify-between'>
          <div class='flex items-center justify-between w-full'>
            <Show when={merged.isBack} fallback={<Heading>QuickPDF</Heading>}>
              <SecondryButton class='mx-5 p-1' icon={<BackIcon/>} onClick={()=> navigate(-1)}/>
            </Show>

            <div class='flex items-center'>
              <SecondryButton class='mx-5 p-1' icon={<SunIcon />} onClick={handleDarkMode} />

              <button
                type='button'
                class='flex items-center focus:outline-none'
                aria-label='toggle profile dropdown'
                onClick={() => setVisible(!visible())}
              >
                <div class='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full'>
                  <img
                    src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
                    class='object-cover w-full h-full'
                    alt='avatar'
                  />
                </div>
              </button>
               <div class={`absolute right-5 top-12 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 transition ease-in-out duration-100 ${visible() ? "visible": "hidden"}`}>

               <Show when={isAdmin()}>
                 <a href="#" class="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                 <AddUserIcon/>
            <span class="mx-1">
                Add User
            </span>
        </a>
        <a href="#" class="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                 <AddUserIcon/>
            <span class="mx-1">
                Edit User
            </span>
        </a>
               </Show>
        <hr class="border-gray-200 dark:border-gray-700 "/>
        <a href="#" class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <LockIcon/>
            <span class="mx-1">
                Sign Out
            </span>
        </a></div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
