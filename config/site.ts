export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "EdTech",
	description: "Makin' Sick Shit!",
	navItems: [
		{
			label: "KineXus",
			href: "/KineXus",
		},
		{
			label: "FaceDetection",
			href: "/FaceDetection",
		},
		{
			label: "HandPose",
			href: "/HandPose",
		},
	],
	navMenuItems: [
		{
			label: "FaceDetection",
			href: "/FaceDetection",
		},
		{
			label: "HandPose",
			href: "/HandPose",
		},
	],
	links: {
		github: "https://github.com/EdSpurrier",
		linkedin: "https://www.linkedin.com/in/ed-spurrier-68123b55/",
	},
};
