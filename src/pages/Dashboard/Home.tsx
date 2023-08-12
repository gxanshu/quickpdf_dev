import { Component, Show, For, createSignal, createEffect } from 'solid-js';
import { Input, SecondryButton, Text, SimpleGrid, AddButton, PdfCompanyCard } from '@components/ui';
import { ReloadIcon } from '@components/Icons';
import Layout from '@components/layouts';
import {
  useAdminChecker,
  fireStore,
  store as Store,
  type Company,
  getHttpImage
} from '@services/index';
import { query, collection, getDocs } from 'firebase/firestore';

const Home: Component = () => {
  const [isAdmin] = useAdminChecker();
  const [allCompanies, setAllCompanies] = createSignal<Company[] | undefined>(undefined);
  const [userInput, setUserInput] = createSignal<string>('');

  let filtedCompanies = () => allCompanies();

  // Fetches all companies from Firebase Firestore
  const syncAllCompanies = async (): Promise<void> => {
    try {
      console.log('Fetching papers');
      const companiesCollection = query(collection(fireStore, 'papers'));
      const snapshot = await getDocs(companiesCollection);
      const companies: Company[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        logo: doc.data().logo,
        mobileNumber: doc.data().mobileNumber,
        owner: doc.data().owner,
        type: doc.data().type,
        address: doc.data().address
      }));
      console.log('Fetched papers', companies);

      // Get local user data from localStorage
      const localData = localStorage.getItem('user');
      const localUserPaper = localData ? JSON.parse(localData) : null;

      if (localUserPaper) {
        console.log('local user finded');
        const usersProject = companies.filter((item) => localUserPaper.papers.includes(item.id));
        console.log('projects of current user', usersProject);
        setAllCompanies(usersProject);
        await Store.set('company', 'companies', usersProject);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDataFromBackend = async (): Promise<void> => {
    const data: Company[] | undefined = await Store.get('company', 'companies');
    if (!data) {
      syncAllCompanies();
    }
    if (data) {
      setAllCompanies(data);
    }
  };

  getDataFromBackend();

  createEffect(() => {
    filtedCompanies = () =>
      allCompanies()?.filter((company) => company.name.toLowerCase().includes(userInput()));
  });

  return (
    <Layout>
      <div class='flex flex-col gap-6'>
        <Text class='text-center'>Newspapers</Text>
        <div class='flex align-center gap-2'>
          <Input
            type='text'
            placeholder='search newspaper...'
            class='w-full py-1 px-3'
            onInput={(e) => setUserInput(e.target.value)}
          />
          <SecondryButton icon={<ReloadIcon />} onClick={syncAllCompanies} />
        </div>
      </div>
      <SimpleGrid class='mt-8 grid-cols-8 gap-2'>
        <Show when={isAdmin()}>
          <AddButton url='/company' />
        </Show>
        <Show
          when={filtedCompanies() != undefined}
          fallback={<PdfCompanyCard id={'1'} logo='' loading />}
        >
          <For each={filtedCompanies()}>
            {(company) => <PdfCompanyCard id={company.id} logo={getHttpImage(company.logo)} />}
          </For>
        </Show>
      </SimpleGrid>
    </Layout>
  );
};

export default Home;
