import { title } from "@/components/primitives";
import { KineXus } from "kinexus-engine";

export default function KineXusPage() {
	return (
		<div>
			<h1 className={title()}>KineXus</h1>
			<KineXus />
		</div>
	);
}
