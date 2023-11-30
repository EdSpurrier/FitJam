'use client'

import { title } from "@/components/primitives";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FpsCounter from '@/components/FpsCounter';

const FaceLandmarksDetection = dynamic(() => import('../../components/FaceLandmarksDetections'), {
    ssr: false
})

export default function FaceDetectionPage() {
	return (
		<div>
			<h1 className={title()}>FaceDetection</h1>

			<div>
				<h2
					style={{
						fontWeight: "normal"
					}}>
					<Link style={{ fontWeight: "bold" }} href={'/'}>Home</Link> / Face Landmark Detection 🤓
				</h2>
				<code style={{ marginBottom: '1rem' }}>Work in progress...</code>
				<FaceLandmarksDetection></FaceLandmarksDetection>

			</div>
		</div>
	);
}
