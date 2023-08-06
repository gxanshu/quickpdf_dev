import { SunIcon } from '@components/Icons';
import { Heading, Container, SecondryButton } from '@components/ui';
import { Component, createSignal, mergeProps } from 'solid-js';

const Header: Component<{
  isBack: boolean;
}> = (props) => {
  const merged = mergeProps({ isBack: false }, props);

  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav class='relative bg-white shadow dark:bg-gray-800'>
      <Container class='py-3'>
        <div class='lg:flex lg:items-center lg:justify-between'>
          <div class='flex items-center justify-between w-full'>
            <Heading>QuickPDF</Heading>

            <div class='flex items-center'>
              <SecondryButton class='mx-5 p-1' icon={<SunIcon />} onClick={handleDarkMode} />

              <button
                type='button'
                class='flex items-center focus:outline-none'
                aria-label='toggle profile dropdown'
              >
                <div class='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full'>
                  <img
                    src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
                    class='object-cover w-full h-full'
                    alt='avatar'
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
