import { children, splitProps, Show } from 'solid-js';
import { DOMElement, JSX } from 'solid-js/jsx-runtime';

type Props = {
  class?: string;
  icon?: DOMElement;
  children?: JSX.Element;
};

/**
 * @param class: if you want to give class
 * @param icon: code for icon svg, etc
 * @returns Secondry button
 */
export function SecondryButton(props: Props) {
  const [local, others] = splitProps(props, ['class', 'icon']);
  const childs = children(() => props.children);

  return (
    <button
      class={`bg-white text-qblack gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-50 duration-300 transition-colors border px-8 py-2.5 dark:bg-gray-900 dark:border-gray-700 ${local.class}`}
      {...others}
    >
      <Show when={local.icon}>{local.icon}</Show>
      {childs()}
    </button>
  );
}
