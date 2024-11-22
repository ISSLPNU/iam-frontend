import {ComponentProps} from "react";
import styled from "styled-components";

const StyledPicture = styled.picture`
    width: 100%;
    height: max-content;
`

const StyledImage = styled.img`
    box-sizing: border-box;

    width: 100%;

    aspect-ratio: 16/9;

    border-radius: 10px;
`

export const AnimeHorizontalPoster = ({imageUrl, ...props}: AnimeHorizontalPosterProps) => {
	return (
		<StyledPicture {...props}>
			<source srcSet={imageUrl} type="image/webp"/>
			<StyledImage src={imageUrl} alt="There should be a poster here😵😵😵😵"/>
		</StyledPicture>
	)
}

type AnimeHorizontalPosterProps = {
	imageUrl?: string;
} & Omit<ComponentProps<"picture">, "children">