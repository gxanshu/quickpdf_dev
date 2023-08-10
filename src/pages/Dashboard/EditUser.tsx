import Layout from '@components/layouts';
import { fireStore, useAdminChecker } from '@services/index';
import { Component, Show, createSignal } from 'solid-js';
import PageNotFind from './404';
import { Input, PrimaryButton } from '@components/ui';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createStore } from 'solid-js/store';

const EditUser: Component = () => {
  const [isAdmin] = useAdminChecker();
  const [user, setUser] = createSignal(false);
  const [papers, setPapers] = createSignal<string[]>(['test']);
  const [form, setForm] = createStore({
    uid: '',
    name: '',
    isAdmin: false,
    number: 0,
    papers: []
  });

  let numberRef: HTMLInputElement | undefined;

  // Getting all papers
  const getAllPapers = async (): Promise<void> => {
    const q = query(collection(fireStore, 'papers'));
    const querySnapshot = await getDocs(q);
    const allPapers: string[] = [];
    querySnapshot.forEach((doc) => {
      allPapers.push(doc.id);
    });
    console.log(allPapers);
    setPapers(allPapers);
  };

  // Searching for user
  const searchFromNumber = async (): Promise<void> => {
    console.log('runned');
    const userRef = collection(fireStore, 'users');
    const q = query(userRef, where('number', '==', numberRef?.value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      form.setValues({
        uid: doc.id,
        name: doc.data().name,
        isAdmin: doc.data().isAdmin,
        number: doc.data().number,
        papers: doc.data().papers
      });
      getAllPapers();
      setUser(true);
    });
  };

  // const save = (values: typeof form.values): void => {
  //   notifications.show({
  //     id: 'load-data',
  //     loading: true,
  //     title: 'Saving user',
  //     message: 'Data is saving on the server, please wait.',
  //     autoClose: false,
  //     withCloseButton: false
  //   })

  //   updateDoc(doc(fireStore, `users/${values.uid}`), {
  //     isAdmin: values.isAdmin,
  //     name: values.name,
  //     number: values.number,
  //     papers: values.papers
  //   }).then(() => {
  //     // Updating localData if changing for currentUser
  //     if (auth.currentUser?.uid === values.uid) {
  //       const currentUserData = JSON.parse(localStorage.getItem('user') as string)
  //       currentUserData.papers = values.papers
  //       localStorage.setItem('user', JSON.stringify(currentUserData))
  //     }
  //     notifications.update({
  //       id: 'load-data',
  //       color: 'teal',
  //       title: `Saved ${values.number}`,
  //       message: 'User is saved on the server',
  //       icon: <IconCross size="1rem" />,
  //       autoClose: 2000
  //     })
  //     form.reset()
  //     setUser(false)
  //   })
  // }

  return (
    <Show when={isAdmin()} fallback={<PageNotFind />}>
      <Layout isBack>
        <div class='flex items-center justify-center px-6 mx-auto'>
          <div class='w-full max-w-md flex gap-6'>
            <Input type='tel' placeholder='phone number' class='px-6 w-11/12' ref={numberRef} />
            <PrimaryButton onClick={searchFromNumber}>Search</PrimaryButton>
          </div>
        </div>
      </Layout>
    </Show>
  );
};

export default EditUser;
