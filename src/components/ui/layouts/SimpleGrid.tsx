import { Component, JSX, children, splitProps } from 'solid-js';

export const SimpleGrid: Component<{
  class: string;
  children: JSX.Element;
}> = (props) => {
  const [local] = splitProps(props, ['class']);
  const child = children(() => props.children);
  return <div class={`grid ${local.class}`}>{child()}</div>;
};
