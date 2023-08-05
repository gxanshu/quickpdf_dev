import { splitProps, children, type Component } from 'solid-js';

/**
 * @param class as class names
 * @return paragrah element
 **/
  export const Text: Component<{
    class?: string
    children: any
  }> = (props) => {
  const [local, others] = splitProps(props, ['class']);
  const child = children(() => props.children);

  return (
    <p class={`text-gray-500 dark:text-gray-400 ${local.class}`} {...others}>
      {child()}
    </p>
  );
}

/**
 * @param class as class names
 * @return span as heading
 **/
export const Heading: Component<{
    class?: string
    children: any
  }> = (props) => {
  const [local, others] = splitProps(props, ['class']);
  const child = children(() => props.children);

  return (
    <h3 class={`text-xl font-medium text-qblack dark:text-gray-200 ${local.class}`} {...others}>
      {child()}
    </h3>
  );
}
