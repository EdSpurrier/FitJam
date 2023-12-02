import KineXus from "@/components/KineXus";
import { title } from "@/components/primitives";

export default function KineXusPage() {
	return (
		<div>
			<h1 className={title()}>KineXus</h1>
			<KineXus />
		</div>
	);
}
