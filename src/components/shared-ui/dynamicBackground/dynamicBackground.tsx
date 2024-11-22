import styled, {keyframes} from "styled-components";
import React from "react";


const StyledDynamicBackground = styled.div`
    position: absolute;

    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    z-index: -97;

    overflow: hidden;
`

const StyledBlur = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    position: absolute;

    color: #00000022;

    top: 0;
    left: 0;

    z-index: -98;

    height: 100%;
    width: 100%;

    backdrop-filter: blur(100px);
`

const firstSvgAnimation = keyframes`
    0% {
        transform: translate(0, 0);
    }
    33% {
        transform: translate(5%, -5%);
    }
    66% {
        transform: translate(-5%, 2%);
    }
    100% {
        transform: translate(0, 0);
    }
`

const secondSvgAnimation = keyframes`
    0% {
        transform: translate(10%, -10%);
    }
    25% {
        transform: translate(0, 0%);
    }
    50% {
        transform: translate(5%, 2%);
    }
    100% {
        transform: translate(10%, -10%);
    }
`

const StyledSvg = styled.svg`
    position: absolute;
    margin: 0 auto;
    z-index: -99;
`

const StyledFirstSvg = styled(StyledSvg)`
    animation: ${firstSvgAnimation} 15s ease infinite;
`

const StyledSecondSvg = styled(StyledSvg)`
    right: 0;
    animation: ${secondSvgAnimation} 15s ease infinite;
`

interface IDynamicBackgroundProps extends React.ComponentProps<"div"> {
	bgText?: string
	firstStainColor?: string
	secondStainColor?: string
}

export const DynamicBackground = ({bgText, firstStainColor, secondStainColor, ...props}: IDynamicBackgroundProps) => {
	return (
		<StyledDynamicBackground {...props}>
			<StyledFirstSvg width="1785" height="966" viewBox="0 0 1785 966" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M707.044 310.444C493.844 336.844 430.877 284.778 426.044 255.444C415.044 132.944 199.544 127.944 69.5438 297.444C-60.4562 466.944 27.5438 611.944 49.5438 837.944C71.5438 1063.94 603.044 746.944 732.544 921.944C862.044 1096.94 1209.04 695.944 1574.54 624.444C1940.04 552.944 1707.54 485.944 1757.04 332.444C1806.54 178.944 1366.04 30.9442 1180.04 1.94423C994.044 -27.0558 973.544 277.444 707.044 310.444Z"
					fill={firstStainColor || "#142E44"}/>
			</StyledFirstSvg>
			<StyledSecondSvg width="1077" height="962" viewBox="0 0 1077 962" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M355 805C121.8 789.8 22.8333 564.667 2.49997 454C-18.5 317 109.5 273.5 104.5 105C99.5 -63.5 751.5 -23 874.5 185.5C959.753 330.014 604 515.5 699 613.5C794 711.5 1000.5 429.5 1064 591C1127.5 752.5 946.5 955.5 741 961C535.5 966.5 646.5 824 355 805Z"
					fill={secondStainColor || "#361244"}/>
			</StyledSecondSvg>
			<StyledBlur>
				{bgText && <h1>{bgText}</h1>}
			</StyledBlur>
		</StyledDynamicBackground>
	)
}