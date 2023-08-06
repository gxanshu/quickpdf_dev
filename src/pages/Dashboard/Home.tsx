import { Component, Show, For } from 'solid-js';
import { Input, SecondryButton, Text, SimpleGrid, AddButton } from '@components/ui';
import { ReloadIcon } from '@components/Icons';
import Layout from '@components/layouts';
import { useAdminChecker } from '@services/hooks';

const Home: Component = () => {
  const [isAdmin] = useAdminChecker();
  return (
    <Layout>
      <div class='flex flex-col gap-6'>
        <Text class='text-center'>Newspapers</Text>
        <div class='flex align-center gap-2'>
          <Input type='text' placeholder='search newspaper...' class='w-full py-1 px-3' />
          <SecondryButton icon={<ReloadIcon />} />
        </div>
      </div>
      <SimpleGrid cols={8} class='mt-8 gap-2'>
        <Show when={isAdmin()}>
          <AddButton url='/login' />
        </Show>
        <For each={[1, 2, 3]}>
          {() => <AddButton url='/login' />}
          {/* @todo add company button*/}
        </For>
      </SimpleGrid>
    </Layout>
  );
};

export default Home;
