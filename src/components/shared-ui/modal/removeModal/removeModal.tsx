import {ComponentProps} from "react";
import {Modal} from "../modal/modal.tsx";
import {Button} from "../../common/button";
import {ModalCloseStatus} from "../modal/modalCloseStatus.ts";
import styled from "styled-components";


const StyledRemoveItemModalWrapper = styled.div`
    display: flex;

    flex-direction: column;

		gap: 50px;
		
    min-width: 400px;
`

const StyledTextContainer = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;

    height: 100%;
`

const StyledButtonsContainer = styled.div`
    display: flex;

    flex-direction: row;

    justify-content: space-around;

    align-items: center;
`

export const RemoveModal = <TItem, >({
	                                     text,
	                                     removeButtonText,
	                                     cancelButtonText,
	                                     ...props
                                     }: IRemoveModalProps<TItem>) => {
	return (
		<Modal<TItem> {...props}
		              render={(data, close) => (
			              <StyledRemoveItemModalWrapper>
				              <StyledTextContainer>
					              <h3>{text || "Are you sure you want to remove?"}</h3>
				              </StyledTextContainer>
				              <StyledButtonsContainer>
					              <Button themeStyle="danger"
					                      onClick={() => close(data, ModalCloseStatus.CONFIRMED)}>
						              {removeButtonText || "Remove"}
					              </Button>
					              <Button themeStyle="success"
					                      onClick={() => close(data, ModalCloseStatus.CANCELED)}
					              >
						              {cancelButtonText || "Cansel"}
					              </Button>
				              </StyledButtonsContainer>
			              </StyledRemoveItemModalWrapper>
		              )}/>
	)
}

interface IRemoveModalProps<TItem> extends Omit<ComponentProps<typeof Modal<TItem>>, "render"> {
	text?: string;
	removeButtonText?: string;
	cancelButtonText?: string;
}