import {UserAvatar} from "../index.ts";
import {ComponentProps} from "react";
import {IUser} from "../../../../entities/user/model";
import styled from "styled-components";

const StyledUserPreviewInfo = styled.div`
    display: flex;
    
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: max-content;
`

const StyledUserAvatar = styled(UserAvatar)`
    margin: 0 10px 0 0;
`

interface IUserPreviewInfoProps extends ComponentProps<"div">{
  user: IUser
}

export const UserPreviewInfo = ({user, children, ...props}: IUserPreviewInfoProps) => {
  return (
    <StyledUserPreviewInfo {...props}>
      <StyledUserAvatar avatar={"dfdf"}/>
      <h3>{user.nickname}</h3>
      {children}
    </StyledUserPreviewInfo>
  )
}
