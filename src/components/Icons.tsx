import { Component, JSX, splitProps } from 'solid-js';

export const ReloadIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-6 w-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
      />
    </svg>
  );
};

export const SunIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-6 w-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
      />
    </svg>
  );
};

export const MoonIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-6 w-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
      />
    </svg>
  );
};

export const AddIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-6 w-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};

export const BackIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-6 w-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
      />
    </svg>
  );
};

export const AddUserIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-5 w-5 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
      />
    </svg>
  );
};

export const EditUserIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-5 w-5 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
      />
    </svg>
  );
};

export const LockIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`h-5 w-5 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
      />
    </svg>
  );
};

export const UploadIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class={`w-6 h-6 ${local.class}`}
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
  );
};

export const EmailIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class={`w-6 h-6 ${local.class}`}
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
  );
};

export const PhoneIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`w-6 h-6 ${local.class}`}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
      />
    </svg>
  );
};

export const PasswordIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class={`w-6 h-6 ${local.class}`}
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
  );
};

export const LocationIcon: Component<{
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class={`w-6 h-6 ${local.class}`}
    >
      <path stroke-linecap='round' stroke-linejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
      />
    </svg>
  );
};
