import { Input, PrimaryButton, Text, Heading } from '@components/ui';
import { Setter, splitProps } from 'solid-js';

type Props = {
  loginHook: Setter<boolean>
}

export default function Login(props: Props) {
  const [local] = splitProps(props, ["loginHook"])

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
            />
          </div>

          <div class='w-full mt-4'>
            <Input
              class='w-full px-4 py-2 mt-2'
              type='password'
              placeholder='Password'
            />
          </div>
          <PrimaryButton class='w-full mt-4'>Login</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
