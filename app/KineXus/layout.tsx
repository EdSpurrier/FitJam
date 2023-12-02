export default function KineXusLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col w-screen h-screen">
			{children}
		</section>
	);
}
