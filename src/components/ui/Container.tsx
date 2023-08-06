import { children, splitProps, type Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

/**
 * @param class: if you want to give class
 * @param icon: code for icon svg, etc
 */
export const Container: Component<{
  class?: string;
  children?: JSX.Element;
}> = (props) => {
  const [local, others] = splitProps(props, ['class']);
  const childs = children(() => props.children);

  return (
    <div class={`container mx-auto ${local.class}`} {...others}>
      {childs()}
    </div>
  );
};
