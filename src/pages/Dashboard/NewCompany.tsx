import { Component, Show, createSignal, onMount } from 'solid-js';
import PageNotFind from './404';
import { useAdminChecker } from '@services/hooks';
import Layout from '@components/layouts';
import { AddUserIcon, LocationIcon, PhoneIcon, UploadIcon } from '@components/Icons';
import { Input, PrimaryButton } from '@components/ui';
// @ts-ignore type deifination is not provided by the package
import { Select } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore, spaceToDash, storage } from '@services/index';
import toast from 'solid-toast';
import { ref, uploadString } from 'firebase/storage';

const NewCompany: Component = () => {
  console.log("new company page")
  const [isAdmin] = useAdminChecker()
  const [desingers, setDesingers] = createSignal<string[]>([]);
  const [selectedDesingers, setSelectedDesingers] = createSignal([]);
  const [avatarImage, setAvatarImage] = createSignal<string>(
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100'
  );
  const [paperType, setPaperType] = createSignal('')

  let nameInputBox: HTMLInputElement | undefined,
    addressInputBox: HTMLInputElement | undefined,
    ownerInputBox: HTMLInputElement | undefined,
    numberInputBox: HTMLInputElement | undefined;

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

  const getAllUsers = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(doc(fireStore, 'company', 'allUsers'))
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()?.users)
        const updatedData = docSnap.data()?.users.map((user: { uid: string; name: string }) => ({
          value: user.uid,
          label: user.name
        }))
        setDesingers(updatedData)
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  // // Fetching all users
  // onMount(() => {
  //   getAllUsers()
  // })

  const save = async (): Promise<void> => {
    const values = {
      name: nameInputBox?.value,
      type: paperType(),
      owner: ownerInputBox?.value,
      mobileNumber: numberInputBox?.value,
      address: addressInputBox?.value
    }
    const savingToast = toast.loading("saving company")
      const nameInSpaceToDash = spaceToDash(values.name as string)

      // Save the image with company-name
      const storageRef = ref(storage, `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`)

      // 1. Uploading image
      await uploadString(storageRef, avatarImage(), 'data_url')

      // 2. Saving paper
      await setDoc(doc(fireStore, `papers`, `${nameInSpaceToDash}`), {
        name: values.name,
        type: values.type,
        owner: values.owner,
        mobileNumber: values.mobileNumber,
        address: values.address,
        logo: `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`
      })

      // 3. Assign paper to user
      await updateDoc(doc(fireStore, 'users', values.creator), {
        papers: arrayUnion(nameInSpaceToDash)
      })

      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Saved',
        message: 'Data now saved on the server.',
        icon: <IconCheck size="1rem" />,
        autoClose: 2000
      })

      navigate('/')
      console.log('Saved')
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      notifications.update({
        id: 'load-data',
        color: 'red',
        title: `Error ${errorCode}`,
        message: errorMessage,
        icon: <IconCross size="1rem" />,
        autoClose: 2000
      })
    }
  }

  return (
    <Show when={isAdmin()} fallback={<PageNotFind/>}>
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
              placeholder='Company Name'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              ref={nameInputBox}
            />
          </div>

          <label
            for='dropzone-file'
            class='flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900'
          >
            <UploadIcon class='text-gray-300 dark:text-gray-500' />
            <h2 class='mx-3 text-gray-400'>Agency Logo</h2>

            <input
              id='dropzone-file'
              type='file'
              accept='image/*'
              class='hidden'
              onChange={handleFileUpload}
            />
          </label>

          <Select
            class='qmultiselect'
            options={['Daily', 'Weekly', 'Monthly']}
            onChange={setPaperType}
          />

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
              <AddUserIcon class='mx-3 text-gray-300 dark:text-gray-500' />
            </span>

            <Input
              type='text'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              placeholder='Owner Name'
              ref={ownerInputBox}
            />
          </div>

          <div class='relative flex items-center mt-4'>
            <span class='absolute'>
              <LocationIcon class='mx-3 text-gray-300 dark:text-gray-500' />
            </span>

            <Input
              type='text'
              class='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900'
              placeholder='Address'
              ref={addressInputBox}
            />
          </div>

          <Select
            class='qmultiselect'
            multiple
            options={desingers()}
            onChange={setSelectedDesingers}
            isOptionDisabled={(option: never) => desingers().includes(option)}
          />

          <div class='mt-6'>
            <PrimaryButton class='w-full px-6 py-3'>
              Save
            </PrimaryButton>
          </div>
        </div>
      </div>
      </Layout>
    </Show>
  );
};

export default NewCompany;
