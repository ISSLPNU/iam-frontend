import {ComponentProps, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

const StyledSlider = styled.div`
    box-sizing: content-box;
    position: relative;
    width: 200px;
    height: 20px;
    padding: 10px 0;
    margin: 0 15px;
`

const SliderTruck = styled.span<{ $isFocused: boolean }>`
    position: absolute;
    display: flex;
    height: 5px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    background-color: ${props => props.$isFocused ? '#ff0000' : '#ffffff55'};
`

const SliderFilledTrack = styled(motion.span)`
    position: absolute;
    display: flex;
    height: 5px;
    width: 100%;
    background-color: #fff;
`

const StyledThumbWrapper = styled(motion.span)`
    position: absolute;
    display: flex;
    width: 18px;
    height: 18px;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
`

const StyledThumb = styled.input`
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    background: none;
    outline: none;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        background: #ffffff;
        cursor: pointer;
        border-radius: 50%;
    }

    &::after {
        content: "";
        position: absolute;
        width: 180%;
        height: 180%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }

    &::before {
        content: "";
        position: absolute;
        background: #ffffff33;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: ease-in-out .3s;
        cursor: pointer;
    }

    &:hover {
        &::before {
            width: 180%;
            height: 180%;
        }
    }

    &:active {
        &::before {
            width: 230%;
            height: 230%;
        }
    }
`

const thumbWidth = 18

export const Slider = (
	{
		min = 0, max = 100, value = 0,
		onChange,
		...props
	}: SliderProps) => {
	const [isDragging, setIsDragging] = useState(false)
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLInputElement>(null);

	const updateValue = useCallback((clientX: number) => {
		if (sliderRef.current && onChange) {
			const sliderRect = sliderRef.current.getBoundingClientRect()
			const relativeX = Math.min(Math.max(0, clientX - sliderRect.left), sliderRect.width)
			const percentage = relativeX / (sliderRect.width)
			const newValue = min + percentage * (max - min)
			onChange(newValue)
		}
	}, [max, min, onChange])

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			updateValue(event.clientX)
			if (!isDragging) {
				setIsDragging(true)
			}
		}

		const handleMouseUp = () => {
			setIsDragging(false)
			setIsMouseDown(false)
			thumbRef.current?.blur()
			thumbRef.current?.releasePointerCapture(1)
		}

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				setIsDragging(false)
				setIsMouseDown(false)
				thumbRef.current?.blur()
				thumbRef.current?.releasePointerCapture(1)
			}
		}

		if (isMouseDown) {
			window.addEventListener("mousemove", handleMouseMove)
			window.addEventListener("mouseup", handleMouseUp)
		} else {
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseup", handleMouseUp)
		}

		document.addEventListener("visibilitychange", handleVisibilityChange)

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseup", handleMouseUp)
			document.removeEventListener("visibilitychange", handleVisibilityChange)
		}
	}, [isDragging, isMouseDown, updateValue])

	useEffect(() => {
		if (isDragging && thumbRef.current) {
			thumbRef.current.setPointerCapture(1)
			thumbRef.current.focus()
		}
	}, [isDragging])

	const leftPosition = ((value - min) / (max - min)) * 100

	return (
		<StyledSlider ref={sliderRef}
		              onMouseDown={(e) => {
			              updateValue(e.clientX)
			              setIsMouseDown(true)
		              }}>
			<SliderTruck $isFocused={isFocused}>
				<SliderFilledTrack animate={{width: `${leftPosition}%`}}
				                   transition={{duration: isDragging ? 0 : 0.2}}/>
			</SliderTruck>
			<StyledThumbWrapper animate={{left: `calc(${leftPosition}% - ${thumbWidth / 2}px)`}}
			                    transition={{duration: isDragging ? 0 : 0.2}}>
				<StyledThumb ref={thumbRef}
				             type="range"
				             min={min}
				             max={max}
				             readOnly
				             value={value}
				             // onFocus={() => setIsFocused(true)}
				             onBlur={() => setIsFocused(false)}
				             {...props}
				/>
			</StyledThumbWrapper>
		</StyledSlider>
	)
}

export type SliderProps = {
	min?: number
	max?: number
	value?: number
	onChange?: (value: number) => void
} & Omit<ComponentProps<"input">, "ref" | "onChange">