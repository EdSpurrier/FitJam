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
			<h1 className={title()}>HandPose</h1>

			<div>
			<h2
                    style={{
                        fontWeight: "normal"
                    }}>
                    <Link style={{ fontWeight: "bold" }} href={'/'}>Home</Link> / Hand Pose Detection 👋
                </h2>
                <code style={{ marginBottom: '1rem' }}>Work in progress...</code>
				<HandPoseDetection>
				</HandPoseDetection>

			</div>
		</div>
	);
}
