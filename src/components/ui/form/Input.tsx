import { splitProps, type Component } from 'solid-js';

/**
 * @param class: if you want to give class
 * @returns input box with some designed classes
 */
export const Input: Component<{
  class: string;
  type: string;
  placeholder: string;
  onInput?: (e: any) => void;
}> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return (
    <input
      class={`block text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${local.class}`}
      {...others}
    />
  );
};
