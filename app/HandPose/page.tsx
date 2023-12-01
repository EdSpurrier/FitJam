'use client'

import { title } from "@/components/primitives";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FpsCounter from '@/components/FpsCounter';

const HandPoseDetection = dynamic(() => import('../../components/HandPoseDetections'), {
    ssr: false
})

export default function HandPosePage() {
	return (
		<div>
			<HandPoseDetection />
		</div>
	);
}
