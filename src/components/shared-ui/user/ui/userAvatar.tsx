import styled from "styled-components";
import {ComponentProps} from "react";
import vite from "../../../../../public/vite.svg";

const StyledImage = styled.img`
    border-radius: 100px;
    background-color: #111111;

    height: 25px;
    width: 25px;
`

interface IUserAvatarProps extends ComponentProps<"img">{
  avatar: string;
}

export const UserAvatar = ({avatar, ...props}: IUserAvatarProps) => {
  return (
    <StyledImage src={vite} {...props}/>
  )
}
