import { Component, createSignal, onMount, For, createEffect } from 'solid-js';
import Layout from '@components/layouts';
import {
  AddButton,
  Heading,
  LayoutCard,
  PaperCard,
  SecondryButton,
  SimpleGrid
} from '@components/ui';
import {
  DashToSpace,
  capitalizeFirstLetters,
  convertToDate,
  monthsOfYear,
  PaperType,
  store,
  fireStore
} from '@services/index';
import { useParams } from '@solidjs/router';
import { ReloadIcon } from '@components/Icons';
import { doc, getDoc } from 'firebase/firestore';
import toast from 'solid-toast';

const Company: Component = () => {
  const { companyName } = useParams();
  const [localLayouts, setLocalLayouts] = createSignal<{ [key: string]: any }>({});
  const [selectedDate, setSelectedDate] = createSignal<Date | null>(new Date());
  const [newspapers, setNewspapers] = createSignal<PaperType[]>([
    {
      date: new Date(),
      realDate: '01-01-2023'
    }
  ]);

  let filteredNewspapers = () => newspapers()

  // Function to get all papers from the backend
  const getAllPapers = async (): Promise<void> => {
    try {
      const papers = await store.getPDF(companyName);
      const data: PaperType[] = papers.map((realDate: string) => ({
        date: convertToDate(realDate),
        realDate
      }));

      setNewspapers(
        data.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        })
      );
    } catch (error) {
      console.error('Failed to fetch papers:', error);
    }
  };

  // Function to get all layout components from localStorage
  const getAllLayout = (): void => {
    const localData = localStorage.getItem(companyName as string);
    if (localData !== null) {
      setLocalLayouts(JSON.parse(localData));
    }
  };

  // Function to load all data (layouts and papers) from Firebase
  const loadAllData = async (): Promise<void> => {
    const toastID = toast.loading('loading layouts');
    try {
      // Load layouts from Firebase
      const docRef = doc(fireStore, 'papers', companyName as string);
      const docSnap = await getDoc(docRef);
      const layouts = docSnap.data()?.layouts;
      if (layouts !== undefined) {
        localStorage.setItem(companyName as string, JSON.stringify(layouts));
        setLocalLayouts(layouts);
        toast.success('layouts loaded successfully', {
          id: toastID
        });
      } else {
        toast.success('Done: no layouts found', {
          id: toastID
        });
      }
      getAllPapers();
    } catch (error) {
      toast.error(error as string, {
        id: toastID
      });
    }
  };

  const handleDateInput = (e): void => {
    let date = new Date(e.target.value);
    setSelectedDate(date);
  };

  onMount(() => {
    getAllPapers();
    getAllLayout();
  });

  

  return (
    <Layout isBack>
      <div class='flex justify-center align-center flex-col'>
        <Heading class='text-center'>
          {capitalizeFirstLetters(DashToSpace(companyName as string))}
        </Heading>
      </div>
      <div class='mt-3 flex justify-between'>
        <input
          type='date'
          class='block mt-2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white pt-1.5 px-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300'
          onChange={handleDateInput}
        />
        <SecondryButton icon={<ReloadIcon />} onClick={loadAllData} />
      </div>
      <div class='mt-8'>
        <Heading class='text-md'>Layout</Heading>
        <SimpleGrid class='grid-cols-8 w-full gap-8 mt-4'>
          <AddButton url={`/new-design/${companyName}`} height='h-36' />
          <For each={Object.keys(localLayouts)}>
            {(layout) => <LayoutCard url={`/edit-layout/${companyName}/${layout}`} name={layout} />}
          </For>
        </SimpleGrid>

        <Heading class='text-md mt-8'>Newspapers</Heading>
        <SimpleGrid class='grid-cols-8 w-full gap-8 mt-4'>
          <AddButton url={`/new-pdf/${companyName}`} height='h-40' />
          <For each={filteredNewspapers()}>
            {(paper) => (
              <PaperCard
                url={`/edit-pdf/${companyName}/${paper.realDate}`}
                date={paper.date.getDate()}
                month={monthsOfYear[paper.date.getMonth()]}
              />
            )}
          </For>
        </SimpleGrid>
      </div>
    </Layout>
  );
};

export default Company;
