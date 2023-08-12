import Layout from '@components/layouts';
import { auth, fireStore, useAdminChecker } from '@services/index';
import { Component, Show, createSignal, createUniqueId } from 'solid-js';
import PageNotFind from './404';
import { Input, PrimaryButton } from '@components/ui';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { AddUserIcon, PhoneIcon } from '@components/Icons';
// @ts-ignore type deifination is not provided by the package
import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import toast from 'solid-toast';

/**
 * type of the newspaper
 **/
type SelectValue = {
  id: string;
  name: string;
};

const EditUser: Component = () => {
  /**
   * @param {string} name
   * convert a name into a newspaper object
   **/
  const createValue = (name: string): SelectValue => {
    return { id: createUniqueId(), name };
  };

  /**
   * dummy data to get a idea of array of newspaper objects
   **/
  const candidates: SelectValue[] = [
    createValue('apple'),
    createValue('banana'),
    createValue('pear'),
    createValue('pineapple'),
    createValue('kiwi')
  ];

  const initialValue = [candidates[2]];
  const [isAdmin] = useAdminChecker();
  const [isUser, setIsuser] = createSignal(false);
  // list of the papers avilable on the server
  const [options, setOptions] = createSignal<SelectValue[]>(candidates);
  // list of the newspaper assigned to the user
  const [selectedValues, setSelectedValues] = createSignal<SelectValue[]>(initialValue);

  const onChange = (selected: SelectValue[]) => {
    setSelectedValues(selected);

    const lastValue = selected[selected.length - 1];
    if (lastValue && !options().includes(lastValue)) {
      setOptions([...options(), lastValue]);
    }
  };

  const props = createOptions(options, {
    key: 'name',
    // this is not working need to figure out
    disable: (value: any) => selectedValues().some((item) => item.name === value),
    filterable: true
  });

  // all the refrence of element in the DOM
  let numberRef: HTMLInputElement | undefined;
  let nameInputBox: HTMLInputElement | undefined,
    numberInputBox: HTMLInputElement | undefined,
    isAdminBox: HTMLInputElement | undefined;

  /**
   * @important this variable carry the userID of ther searched User
   **/
  var userID: string;

  // Getting all papers
  const getAllPapers = async (): Promise<void> => {
    const q = query(collection(fireStore, 'papers'));
    const querySnapshot = await getDocs(q);
    const allPapers: string[] = [];
    querySnapshot.forEach((doc) => {
      allPapers.push(doc.id);
    });
    // converting all the paper names into paper object
    let newspapers = allPapers.map((paper) => createValue(paper));
    setOptions(newspapers);
  };

  // Searching for user
  const searchFromNumber = async (): Promise<void> => {
    const searchToastId = toast.loading('loading users');
    const userRef = collection(fireStore, 'users');
    const q = query(userRef, where('number', '==', Number(numberRef?.value)));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      toast.error('no user find', {
        id: searchToastId
      });
    } else {
      setIsuser(true);
      querySnapshot.forEach((doc) => {
        userID = doc.id;
        nameInputBox?.setAttribute('value', doc.data().name);
        isAdminBox?.setAttribute('checked', doc.data().isAdmin);
        numberInputBox?.setAttribute('value', doc.data().number);
        let newspapers = doc.data().papers.map((paper: string) => createValue(paper));
        setSelectedValues(newspapers);
        getAllPapers();
        toast.success('user loaded successfully', {
          id: searchToastId
        });
      });
    }
  };

  const save = (): void => {
    const values = {
      name: nameInputBox?.value,
      number: numberInputBox?.value,
      papers: selectedValues().map((paper) => paper.name),
      isAdmin: isAdminBox?.checked
    };
    // if any one of them is unfiled then do nothing
    if (!values.name?.trim() || !values.papers || !values.number?.trim()) return;
    const savingToast = toast.loading('saving user details');
    console.log(values);
    updateDoc(doc(fireStore, `users/${userID}`), {
      name: values.name,
      number: values.number,
      papers: values.papers,
      isAdmin: values.isAdmin
    })
      .then(() => {
        // Updating localData if changing for currentUser
        if (auth.currentUser?.uid === userID) {
          const currentUserData = JSON.parse(localStorage.getItem('user') as string);
          currentUserData.papers = values.papers;
          localStorage.setItem('user', JSON.stringify(currentUserData));
        }
        toast.success('users updated successfully', {
          id: savingToast
        });
        setIsuser(false);
      })
      .catch((err) => {
        toast.error(err, {
          id: savingToast
        });
      });
  };

  return (
    <Show when={isAdmin()} fallback={<PageNotFind />}>
      <Layout isBack>
        <div class='flex items-center justify-center px-6 mx-auto'>
          <div class='w-full max-w-md flex gap-6'>
            <Input type='tel' placeholder='phone number' class='px-6 w-11/12' ref={numberRef} />
            <PrimaryButton onClick={searchFromNumber}>Search</PrimaryButton>
          </div>
        </div>
        <div class='flex items-center justify-center px-6 mx-auto'>
          <div class='w-full max-w-md'>
            <div class='relative flex items-center mt-8'>
              <span class='absolute'>
                <AddUserIcon class='mx-3 text-gray-300 dark:text-gray-500' />
              </span>
              <Input
                type='text'
                placeholder='Full Name'
                class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
                ref={nameInputBox}
                disabled={!isUser()}
              />
            </div>

            <div class='relative flex items-center mt-6'>
              <span class='absolute'>
                <PhoneIcon class='mx-3 text-gray-300 dark:text-gray-500' />
              </span>

              <Input
                type='tel'
                class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
                placeholder='Mobile Number'
                ref={numberInputBox}
                disabled={!isUser()}
              />
            </div>

            <Select
              class='qmultiselect'
              multiple
              initialValue={selectedValues()}
              onChange={onChange}
              disabled={!isUser()}
              {...props}
            />

            <div class='relative flex items-center mt-6'>
              <div class='flex items-center'>
                <Input
                  type='checkbox'
                  class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  placeholder='is admin'
                  ref={isAdminBox}
                  disabled={!isUser()}
                />
                <label
                  for='link-checkbox'
                  class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  do yo want to make him <span class='text-blue-600 dark:text-blue-500'>admin</span>
                </label>
              </div>{' '}
            </div>

            <div class='mt-6'>
              <PrimaryButton class='w-full px-6 py-3' onClick={save}>
                Update
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Layout>
    </Show>
  );
};

export default EditUser;
