import styled from "styled-components";
import {ComponentProps} from "react";
import {Section} from "../common/section";

const StyledSettingSection = styled.div`
    &:not(:first-child) {
        margin-top: 25px;
    }
`

const StyledSettingHeader = styled.h2`
    margin: 0;
`

interface ISettingSectionProps extends ComponentProps<"div"> {
  titleText?: string;
}

export const SettingSection = ({titleText, children, ...props}: ISettingSectionProps) => {
  return (
    <StyledSettingSection {...props}>
      <StyledSettingHeader>
        {titleText}
      </StyledSettingHeader>
      <Section>
        {children}
      </Section>
    </StyledSettingSection>
  )
}
