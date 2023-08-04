import { Input, PrimaryButton, Text, Heading } from '@components/ui';
import { Setter, splitProps, type Component } from 'solid-js';
import {auth, fireStore} from "@services/firebase"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import toast from 'solid-toast';

const Login: Component<{
  loginHook: Setter<boolean>
}> = (props) => {
  const [local] = splitProps(props, ["loginHook"])
  let emailInputBox: HTMLInputElement | undefined, passwordInputBox: HTMLInputElement | undefined;

  const handleSubmit = async() => {
    console.log("working")
    if (!emailInputBox?.value.trim() || !passwordInputBox?.value.trim()) return;

    let emailValue = emailInputBox?.value;
    let passwordValue = passwordInputBox?.value;
    const toastId = toast.loading("loging");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue)
      const user = userCredential.user
      console.log(user)

      const docRef = doc(fireStore, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      window.localStorage.setItem(
        'user',
        JSON.stringify({
          login: true,
          admin: docSnap.data()?.isAdmin ? true : false,
          papers: docSnap.data()?.papers
        })
      )

      local.loginHook(true) // hook to reload App.tsx
      toast.success(`Welcome ${userCredential.user.displayName}`, {
        id: toastId,
      });

      } catch (error: any) {
      const errorMessage = error.message
      console.log('errorMsg', errorMessage)
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  }

  return (
    <div class='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-20'>
      <div class='px-6 py-4'>
        <div class='flex justify-center mx-auto'>
          <img class='w-auto h-7 sm:h-8 rounded-lg' src='/quickpdf.png' alt='' />
        </div>

        <Heading class='mt-3 text-xl text-center'>Welcome Back</Heading>
        <Text class='mt-1 text-center'>Login in your account</Text>

        <div>
          <div class='w-full mt-4'>
            <Input
              class='w-full px-4 py-2 mt-2'
              type='email'
              placeholder='Email Address'
              ref={emailInputBox}
            />
          </div>

          <div class='w-full mt-4'>
            <Input
              class='w-full px-4 py-2 mt-2'
              type='password'
              placeholder='Password'
              ref={passwordInputBox}
            />
          </div>
          <PrimaryButton class='w-full mt-4' onClick={handleSubmit}>Login</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Login
