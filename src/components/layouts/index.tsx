import { JSX, type Component, mergeProps, children } from 'solid-js';
import { Container } from '@components/ui';
import Header from './Header';

type LayoutProps = {
  /**
   * The content to be rendered inside the layout.
   */
  children: JSX.Element;
  /**
   * Flag to determine if a back button should be displayed in the header.
   */
  isBack?: boolean;
};

/**
 * Layout component that wraps the content with a header and container.
 * @param {LayoutProps} props - The props for the Layout component.
 */
const Layout: Component<LayoutProps> = (props: LayoutProps) => {
  const merged = mergeProps({ isBack: false, props });
  const child = children(() => props.children);
  return (
    <>
      {/* Header component with navigation options */}
      <Header isBack={merged.isBack} />
      {/* Container to wrap the children */}
      <Container class='my-8'>{child()}</Container>
    </>
  );
};

export default Layout;
