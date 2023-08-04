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
 * @returns primary button
 */
export function PrimaryButton(props: Props) {
  const [local, others] = splitProps(props, ['class', 'icon']);
  const childs = children(() => props.children);

  return (
    <button
      class={`bg-qblue transform rounded-lg px-6 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${local.class}`}
      {...others}
    >
      <Show when={local.icon}>{local.icon}</Show>
      {childs()}
    </button>
  );
}
