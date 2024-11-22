import {Slider, SliderProps} from "./slider.tsx";
import styled from "styled-components";
import {AnimationDefinition, motion} from "framer-motion";
import {useState} from "react";

const StyledWrapper = styled(motion.div)`
    overflow: hidden;
    width: 0;
`

export const HideableSlider = ({hide, ...props}: HideableSliderProps) => {
	const [overflow, setOverflow] = useState<"visible" | "hidden">("hidden");

	return (
		<StyledWrapper
			style={{overflow: overflow}}
			animate={{
				width: hide ? 0 : "max-content",
			}}
			onAnimationStart={() => {
				setOverflow("hidden")
			}}
			onAnimationComplete={(definition: AnimationDefinition) => {
				if (!hide && 'width' in definition && definition.width === "max-content") {
					setOverflow("visible");
				}
			}}
		>
			<Slider {...props}/>
		</StyledWrapper>
	)
}

type HideableSliderProps = {
	hide: boolean
} & SliderProps