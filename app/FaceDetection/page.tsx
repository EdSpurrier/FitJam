'use client'

import dynamic from 'next/dynamic';

const FaceLandmarksDetection = dynamic(() => import('../../components/FaceLandmarksDetections'), {
    ssr: false
})

export default function FaceDetectionPage() {
	return (
		<div>
			<FaceLandmarksDetection />
		</div>
	);
}
