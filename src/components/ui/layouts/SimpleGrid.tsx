import { Component, JSX, children, splitProps } from 'solid-js';

export const SimpleGrid: Component<{
  cols: number;
  class: string;
  children: JSX.Element;
}> = (props) => {
  const [local] = splitProps(props, ['cols', 'class']);
  const child = children(() => props.children);
  return <div class={`grid grid-cols-${local.cols} ${local.class}`}>{child()}</div>;
};
