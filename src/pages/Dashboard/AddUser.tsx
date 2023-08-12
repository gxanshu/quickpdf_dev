import Layout from '@components/layouts';
import { Component, createSignal, onMount } from 'solid-js';
import { Input, PrimaryButton } from '@components/ui';
// @ts-ignore type deifination is not provided by the package
import { Select } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import { query, collection, getDocs, setDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { fireStore, storage, auth } from '@services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadString, ref } from 'firebase/storage';
import toast from 'solid-toast';
import { getHttpImage } from '@services/utils';
import { AddUserIcon, EmailIcon, PasswordIcon, PhoneIcon, UploadIcon } from '@components/Icons';

const AddUser: Component = () => {
  const [newspapers, setNewspapers] = createSignal<string[]>([]);
  const [selectedNewspapers, setSelectedNewspapers] = createSignal([]);
  const [avatarImage, setAvatarImage] = createSignal<string>(
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100'
  );

  let nameInputBox: HTMLInputElement | undefined,
    emailInputBox: HTMLInputElement | undefined,
    passwordInputBox: HTMLInputElement | undefined,
    numberInputBox: HTMLInputElement | undefined;

  const getAllPapers = async (): Promise<void> => {
    try {
      const q = query(collection(fireStore, 'papers'));
      const querySnapshot = await getDocs(q);
      const allPapers: string[] = [];
      querySnapshot.forEach((doc) => {
        allPapers.push(doc.id);
      });
      console.log(allPapers);
      setNewspapers(allPapers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const save = async (): Promise<void> => {
    // saving user
    const values = {
      name: nameInputBox?.value,
      emailAddress: emailInputBox?.value,
      password: passwordInputBox?.value,
      number: numberInputBox?.value
    };
    if (
      !values.name?.trim() ||
      !values.emailAddress?.trim() ||
      !values.password?.trim() ||
      !values.number?.trim()
    )
      return;
    const toastID = toast.loading('saving user');
    try {
      // 1. registered user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.emailAddress,
        values.password
      );
      const user = userCredential.user;

      //2. uploading profile pic
      const metaData = {
        cacheControl: 'public,max-age=86400'
      };
      const storageRef = ref(storage, `userpic/${user.uid}.jpeg`);
      await uploadString(storageRef, avatarImage(), 'data_url', metaData);

      //2. updating name
      await updateProfile(user, {
        displayName: values.name,
        photoURL: getHttpImage(`userpic/${user.uid}.jpeg`)
      });

      //3. adding in company employ list
      const userRef = doc(fireStore, 'company', 'allUsers');
      await updateDoc(userRef, {
        users: arrayUnion({
          name: user.displayName,
          uid: user.uid
        })
      });

      //4. giving user their company
      await setDoc(doc(fireStore, `users/${user.uid}`), {
        isAdmin: false,
        name: values.name,
        number: values.number,
        papers: selectedNewspapers()
      });

      //5. updating notification
      toast.success('User Created Successfully', {
        id: toastID
      });
    } catch (error: any) {
      const errorMessage = error.message;
      // ..
      toast.error(errorMessage, {
        id: toastID
      });
    }
  };

  onMount(async () => {
    await getAllPapers();
  });

  return (
    <Layout isBack>
      <div class='flex items-center justify-center px-6 mx-auto'>
        <div class='w-full max-w-md'>
          <div class='w-full flex items-center justify-center'>
            <img
              class='object-cover w-16 h-16 rounded-full ring ring-gray-300 dark:ring-gray-600'
              src={avatarImage()}
              alt=''
            />
          </div>
          <div class='relative flex items-center mt-8'>
            <span class='absolute'>
              <AddUserIcon class='mx-3 text-gray-300 dark:text-gray-500' />
            </span>
            <Input
              type='text'
              placeholder='Full Name'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              ref={nameInputBox}
            />
          </div>

          <label
            for='dropzone-file'
            class='flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900'
          >
            <UploadIcon class='text-gray-300 dark:text-gray-500' />
            <h2 class='mx-3 text-gray-400'>Profile Photo</h2>

            <input
              id='dropzone-file'
              type='file'
              accept='image/*'
              class='hidden'
              onChange={handleFileUpload}
            />
          </label>

          <div class='relative flex items-center mt-6'>
            <span class='absolute'>
              <EmailIcon class='text-gray-300 dark:text-gray-500 mx-3' />
            </span>

            <Input
              type='email'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              placeholder='Email address'
              ref={emailInputBox}
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
            />
          </div>

          <div class='relative flex items-center mt-4'>
            <span class='absolute'>
              <PasswordIcon class='mx-3 text-gray-300 dark:text-gray-500' />
            </span>

            <Input
              type='password'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              placeholder='Password'
              ref={passwordInputBox}
            />
          </div>

          <Select
            class='qmultiselect'
            multiple
            options={newspapers()}
            onChange={setSelectedNewspapers}
            isOptionDisabled={(option: never) => selectedNewspapers().includes(option)}
          />

          <div class='mt-6'>
            <PrimaryButton class='w-full px-6 py-3' onClick={save}>
              Sign Up
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;
