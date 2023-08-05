import { JSX, type Component, mergeProps } from "solid-js"

type LayoutProps = {
  /**
   * The content to be rendered inside the layout.
   */
  children: JSX.Element
  /**
   * The size of the container. Defaults to 'xl'.
   */
  size?: string
  /**
   * Flag to determine if a back button should be displayed in the header.
   */
  isBack?: boolean
}

/**
 * Layout component that wraps the content with a header and container.
 * @param {LayoutProps} props - The props for the Layout component.
 * @returns {JSX.Element} The Layout component.
 */
const Layout: Component<LayoutProps> = (props) => {
	const merged = mergeProps({isBack: false, size: ""})
	return (
		<AnimationPage>
      <>
        {/* Header component with navigation options */}
        <Header isBack={local.isBack} dark={dark} toggleColorScheme={toggleColorScheme} />
        {/* Container to wrap the children */}
        <Container size={size}>{children}</Container>
      </>
    </AnimationPage>
	)
}

export default Layout