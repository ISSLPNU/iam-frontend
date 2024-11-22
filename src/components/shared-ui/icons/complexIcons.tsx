import {useId, useMemo} from "react";
import {BaseIconsProps} from "./mainIcons.tsx";

export const Star1Icon = ({fillPercentage = 0, ...props}: { fillPercentage?: number } & BaseIconsProps) => {
	const id = useId();
	const finalPercentage = useMemo(() => Math.min(fillPercentage, 100), [fillPercentage]);

	if (finalPercentage === 0 || finalPercentage === 100) {
		return (
			<svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.86224 5.66225C10.5522 4.31027 10.8972 3.63427 11.3616 3.41587C11.7659 3.22574 12.234 3.22574 12.6383 3.41587C13.1027 3.63427 13.4477 4.31027 14.1377 5.66225L14.8923 7.14101C15.0957 7.53947 15.1974 7.73871 15.3433 7.89408C15.4726 8.03167 15.6267 8.14362 15.7975 8.22405C15.9904 8.31487 16.2113 8.35001 16.6531 8.42027L18.2927 8.68103C19.7917 8.91944 20.5412 9.03864 20.8924 9.41287C21.1982 9.73864 21.3428 10.1838 21.287 10.627C21.2228 11.1362 20.6865 11.6732 19.6139 12.7472L18.4407 13.9219C18.1245 14.2384 17.9665 14.3967 17.8638 14.5835C17.7729 14.749 17.7141 14.9301 17.6904 15.1174C17.6636 15.3289 17.6984 15.5499 17.7681 15.9918L18.0268 17.6317C18.2633 19.131 18.3815 19.8807 18.1341 20.3304C17.9188 20.7219 17.5402 20.997 17.1013 21.0808C16.5972 21.1771 15.9208 20.833 14.5679 20.1447L13.0882 19.392C12.6894 19.1891 12.4901 19.0877 12.2807 19.0478C12.0952 19.0125 11.9047 19.0125 11.7193 19.0478C11.5098 19.0877 11.3105 19.1891 10.9118 19.392L9.43203 20.1447C8.07916 20.833 7.40273 21.1771 6.8986 21.0808C6.45975 20.997 6.08111 20.7219 5.86577 20.3304C5.6184 19.8807 5.73665 19.131 5.97313 17.6317L6.23179 15.9918C6.30149 15.5499 6.33634 15.3289 6.30956 15.1174C6.28585 14.9301 6.227 14.749 6.13609 14.5835C6.03343 14.3967 5.87537 14.2384 5.55924 13.9219L4.38606 12.7472C3.31346 11.6732 2.77716 11.1362 2.71296 10.627C2.65708 10.1838 2.8017 9.73864 3.10747 9.41287C3.45871 9.03864 4.20822 8.91944 5.70724 8.68103L7.34683 8.42027C7.78863 8.35001 8.00953 8.31487 8.20241 8.22405C8.37321 8.14362 8.5273 8.03167 8.65658 7.89408C8.80256 7.73871 8.90423 7.53947 9.10758 7.14101L9.86224 5.66225Z"
					stroke={finalPercentage === 0 ? "#c0c0c0" : "#ce1b1b"} strokeWidth="2" strokeLinecap="round"
					strokeLinejoin="round"/>
			</svg>
		)
	}

	return (
		<svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id={`gradient-${id}`} x1="0" x2="1" y1="0" y2="0">
					<stop offset={`${finalPercentage}%`} stopColor="#ce1b1b"/>
					<stop offset={`${finalPercentage}%`} stopColor="#c0c0c0"/>
				</linearGradient>
			</defs>
			<path
				d="M9.86224 5.66225C10.5522 4.31027 10.8972 3.63427 11.3616 3.41587C11.7659 3.22574 12.234 3.22574 12.6383 3.41587C13.1027 3.63427 13.4477 4.31027 14.1377 5.66225L14.8923 7.14101C15.0957 7.53947 15.1974 7.73871 15.3433 7.89408C15.4726 8.03167 15.6267 8.14362 15.7975 8.22405C15.9904 8.31487 16.2113 8.35001 16.6531 8.42027L18.2927 8.68103C19.7917 8.91944 20.5412 9.03864 20.8924 9.41287C21.1982 9.73864 21.3428 10.1838 21.287 10.627C21.2228 11.1362 20.6865 11.6732 19.6139 12.7472L18.4407 13.9219C18.1245 14.2384 17.9665 14.3967 17.8638 14.5835C17.7729 14.749 17.7141 14.9301 17.6904 15.1174C17.6636 15.3289 17.6984 15.5499 17.7681 15.9918L18.0268 17.6317C18.2633 19.131 18.3815 19.8807 18.1341 20.3304C17.9188 20.7219 17.5402 20.997 17.1013 21.0808C16.5972 21.1771 15.9208 20.833 14.5679 20.1447L13.0882 19.392C12.6894 19.1891 12.4901 19.0877 12.2807 19.0478C12.0952 19.0125 11.9047 19.0125 11.7193 19.0478C11.5098 19.0877 11.3105 19.1891 10.9118 19.392L9.43203 20.1447C8.07916 20.833 7.40273 21.1771 6.8986 21.0808C6.45975 20.997 6.08111 20.7219 5.86577 20.3304C5.6184 19.8807 5.73665 19.131 5.97313 17.6317L6.23179 15.9918C6.30149 15.5499 6.33634 15.3289 6.30956 15.1174C6.28585 14.9301 6.227 14.749 6.13609 14.5835C6.03343 14.3967 5.87537 14.2384 5.55924 13.9219L4.38606 12.7472C3.31346 11.6732 2.77716 11.1362 2.71296 10.627C2.65708 10.1838 2.8017 9.73864 3.10747 9.41287C3.45871 9.03864 4.20822 8.91944 5.70724 8.68103L7.34683 8.42027C7.78863 8.35001 8.00953 8.31487 8.20241 8.22405C8.37321 8.14362 8.5273 8.03167 8.65658 7.89408C8.80256 7.73871 8.90423 7.53947 9.10758 7.14101L9.86224 5.66225Z"
				stroke={`url(#gradient-${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}