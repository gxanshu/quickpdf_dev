import { Component } from "solid-js";
import { Input, SecondryButton, Text } from "@components/ui";
import { ReloadIcon } from "@components/Icons";
import Layout from "@components/layouts"

const Home: Component = () => {
	return (
		<Layout>
				<div class="flex flex-col gap-6">
					<Text class="text-center">Newspapers</Text>
					<div class="flex align-center gap-2">
						<Input type="text" placeholder="search newspaper..." class="w-full py-1 px-3" />
						<SecondryButton icon={<ReloadIcon/>}/>
					</div>
				</div>
		</Layout>
	)
}

export default Home;