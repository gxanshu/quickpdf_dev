import Layout from '@components/layouts';
import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { Heading, Input } from '@components/ui';
import {Select} from "@thisbeyond/solid-select"
import "@thisbeyond/solid-select/style.css"
import { query, collection, getDocs, setDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { fireStore, storage } from '@services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadString } from 'firebase/storage';

const AddUser: Component = () => {
  const [newspapers, setNewspapers] = createSignal(["apple", "banana", "pear", "pineapple", "kiwi"])
  const [selectedNewspapers, setSelectedNewspapers] = createSignal([])
  const [avatarImage, setAvatarImage] = createSignal<string>("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100")

   const getAllPapers = async (): Promise<void> => {
    try {
      const q = query(collection(fireStore, 'papers'))
      const querySnapshot = await getDocs(q)
      const allPapers: string[] = []
      querySnapshot.forEach((doc) => {
        allPapers.push(doc.id)
      })
      console.log(allPapers)
      setNewspapers(allPapers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileUpload = (file: File): void => {
    setAvatarImage(URL.createObjectURL(file))
  }

  // const save = async (): Promise<void> => {
  //   // saving user
  //   notifications.show({
  //     id: 'load-data',
  //     loading: true,
  //     title: 'Saving user',
  //     message: 'Data is saving on the server please wait.',
  //     autoClose: false,
  //     withCloseButton: false
  //   })
  //   try {
  //     // 1. registered user
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       values.emailAddress,
  //       values.password
  //     )
  //     const user = userCredential.user

  //     //2. uploading profile pic
  //     const storageRef = ref(storage, `userpic/${user.uid}.jpeg`)
  //     await uploadString(storageRef, image, 'data_url')

  //     //2. updating name
  //     await updateProfile(user, {
  //       displayName: values.name,
  //       photoURL: getHttpImage(`userpic/${user.uid}.jpeg`)
  //     })

  //     //3. adding in company employ list
  //     const userRef = doc(fireStore, 'company', 'allUsers')
  //     await updateDoc(userRef, {
  //       users: arrayUnion({
  //         name: user.displayName,
  //         uid: user.uid
  //       })
  //     })

  //     //4. giving user their company
  //     await setDoc(doc(fireStore, `users/${user.uid}`), {
  //       isAdmin: false,
  //       name: values.name,
  //       number: values.number,
  //       papers: values.papers
  //     })

  //     //5. updating notification
  //     notifications.update({
  //       id: 'load-data',
  //       color: 'teal',
  //       title: 'Saved ' + values.name,
  //       message: 'user is saved on the server',
  //       icon: <IconCross size="1rem" />,
  //       autoClose: 2000
  //     })
  //     navigate('/')
  //   } catch (error: any) {
  //     const errorCode = error.code
  //     const errorMessage = error.message
  //     // ..
  //     notifications.update({
  //       id: 'load-data',
  //       color: 'red',
  //       title: 'Error ' + errorCode,
  //       message: errorMessage,
  //       icon: <IconCross size="1rem" />,
  //       autoClose: 2000
  //     })
  //   }
  // }

  onMount(async ()=> {
    await getAllPapers()
  })

  return (
    <Layout>
      <div class='container flex items-center justify-center px-6 mx-auto'>
        <form class='w-full max-w-md'>
          <div class="w-full flex items-center justify-center">
            <img class="object-cover w-16 h-16 rounded-full ring ring-gray-300 dark:ring-gray-600" src={avatarImage()} alt=""/>
          </div>
          <div class='relative flex items-center mt-8'>
            <span class='absolute'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                stroke-width='2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </span>
            <Input
              type='text'
              placeholder='First Name'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
            />
          </div>

          <label
            for='dropzone-file'
            class='flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='w-6 h-6 text-gray-300 dark:text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
              />
            </svg>

            <h2 class='mx-3 text-gray-400'>Profile Photo</h2>

            <input id='dropzone-file' type='file' accept='image/*' class='hidden' onChange={handleFileUpload}/>
          </label>

          <div class='relative flex items-center mt-6'>
            <span class='absolute'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                stroke-width='2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </span>

            <input
              type='email'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Email address'
            />
          </div>

          <div class='relative flex items-center mt-4'>
            <span class='absolute'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                stroke-width='2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </span>

            <input
              type='password'
              class='block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Password'
            />
          </div>

          <Select class="qmultiselect" multiple options={newspapers()} onChange={setSelectedNewspapers} />

          <div class='mt-6'>
            <button class='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddUser;
