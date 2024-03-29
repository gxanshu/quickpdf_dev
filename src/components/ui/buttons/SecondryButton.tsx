import { children, splitProps, Show, type Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

/**
 * @param class: if you want to give class
 * @param icon: code for icon svg, etc
 * @returns Secondry button
 */
export const SecondryButton: Component<{
  class?: string;
  icon?: JSX.Element;
  children?: JSX.Element;
  onClick?: () => void;
}> = (props) => {
  const [local, others] = splitProps(props, ['class', 'icon']);
  const childs = children(() => props.children);

  return (
    <button
      class={`bg-white text-qblack dark:text-white text-sm sm:text-base rounded-lg hover:bg-gray-50 duration-300 transition-colors border p-2 dark:bg-gray-900 dark:border-gray-700 ${local.class}`}
      {...others}
    >
      <Show when={local.icon}>{local.icon}</Show>
      {childs()}
    </button>
  );
};
