import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="justify-center inline-block max-w-lg text-center">
				<h1 className={title()}>Inspire&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Imagine&nbsp;</h1>
				<h1 className={title({ color: "yellow" })}>Create&nbsp;</h1>
				<br />
				<h1 className={title()}>
					Explore new concepts and expand your mind.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Inspire creativity!
				</h2>
			</div>

			<div className="flex gap-3">
{/* 				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					EdSpurrier.com
				</Link> */}
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Be creative <Code color="warning">imagine/explore.reality</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
