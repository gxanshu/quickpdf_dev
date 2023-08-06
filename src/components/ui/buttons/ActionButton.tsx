import { AddIcon } from '@components/Icons';
import { Component, JSX, children, mergeProps, splitProps } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Text } from '@components/ui';

const Button: Component<{
  class?: string;
  onClick?: () => void;
  children?: JSX.Element;
  style?: string
}> = (props) => {
  const [local, other] = splitProps(props, ['class', 'onClick']);
  const child = children(() => props.children);
  return (
    <button
      class={`bg-gray-100 flex justify-center items-center w-28 drop-shadow-md rounded ${local.class}`}
      onClick={local.onClick}
      {...other}
    >
      {child()}
    </button>
  );
};

/**
 * Button to add a new item.
 * @param {string} url - The URL to navigate when the button is clicked.
 * @param {string} height - The height of the button (optional).
 */
export const AddButton: Component<{
  url: string;
  height?: string;
}> = (props) => {
  const merged = mergeProps({ height: 'h-28', url: '' }, props);
  const navigate = useNavigate();
  return (
    <Button class={merged.height} onClick={(): void => navigate(merged.url)}>
      <AddIcon />
    </Button>
  );
};

/**
 * Card component for displaying a PDF company.
 * @param {string} logo - The URL of the company's logo.
 * @param {string} id - The ID of the company.
 */
export const PdfCompanyCard: Component<{
  logo: string;
  id: string;
}> = (props) => {
  const [local] = splitProps(props, ['logo', 'id']);
  const navigate = useNavigate();
  return (
    <Button
      class={`bg-no-repeat bg-cover bg-center h-28`}
      style={`background-image: url(${local.logo})`}
      onClick={(): void => navigate(`/company/${local.id}`)}
    />
  );
};

/**
 * Card component for displaying a paper.
 * @param {string} url - The URL to navigate when the card is clicked.
 * @param {number} date - The date to be displayed on the card.
 * @param {string} month - The month to be displayed on the card.
 */
export const PaperCard: Component<{
  url: string;
  date: number;
  month: string;
}> = (props) => {
  const navigate = useNavigate();
  const [local] = splitProps(props, ['url', 'date', 'month']);
  return (
    <Button class='h-40' onClick={(): void => navigate(local.url)}>
      <Text class='bg-gradient-to-r from-green-400 to-blue-500 text-xl text-center'>
        {local.date}
      </Text>
      <Text>{local.month}</Text>
    </Button>
  );
};

/**
 * Card component for displaying a layout.
 * @param {string} url - The URL to navigate when the card is clicked.
 * @param {string} name - The name of the layout to be displayed on the card.
 */
export const LayoutCard: Component<{
  url: string;
  name: string;
}> = (props) => {
  const navigate = useNavigate();
  const [local] = splitProps(props, ['url', 'name']);

  return (
    <Button class='h-40' onClick={(): void => navigate(local.url)}>
      <Text>{local.name}</Text>
    </Button>
  );
};
