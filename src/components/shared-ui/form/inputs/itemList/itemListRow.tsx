import {ComponentProps, ReactNode, useState} from "react";
import styled, {css} from "styled-components";
import {Modal} from "../../../modal/modal/modal.tsx";
import {ModalCloseStatus} from "../../../modal/modal/modalCloseStatus.ts";
import {Trash6Icon} from "../../../icons/mainIcons.tsx";
import {RemoveModal} from "../../../modal/removeModal/removeModal.tsx";

const StyledItemListRow = styled.div`
    box-sizing: border-box;
    display: flex;

    flex-direction: row;

    width: 100%;

    padding: 5px 10px;
    border-radius: 5px;

    transition: ease-in-out .2s;

    background: #181818;

    &:hover {
        outline: none;
        background-color: #080808;
        cursor: pointer;
    }
`

const StyledItemRemoveButton = styled.div`

    display: flex;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: inherit;
    min-width: max-content;

    margin-left: 10px;

    padding: 4px;
`

const StyledItemMain = styled.div`
    width: 100%;
`

const StyledRemoveButton = styled(Trash6Icon)<{ $disabled: boolean }>`
    ${props => props.$disabled && css`
        & > path {
            stroke: #444;
        }
    `}
`

export const ItemListRow = <TItem, >(
	{
		item,
		index,
		onItemSelected,
		modalRender,
		onRemove,
		children,
		disabled,
		...props
	}: IItemListRowProps<TItem>) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

	if (onItemSelected) {
		return (
			<StyledItemListRow
				{...props}
				onClick={() => {
					console.log("clidsfsdfiojsdoigdg")
				}}>
				{children}
			</StyledItemListRow>
		)
	}

	const tryOpenModal = (openFunction: () => void) => {
		if (!disabled) {
			openFunction()
		}
	}

	return (
		<>
			<Modal<TItem>
				isOpen={isModalOpen}
				initialValue={item}
				onClose={(returnedValue, closeStatus) => {
					setIsModalOpen(false)

					if (closeStatus !== ModalCloseStatus.CANCELED) {
						console.log("Model closed")
						console.log(returnedValue)
					}
				}}
				render={modalRender}/>
			{onRemove && <RemoveModal<TItem>
          isOpen={isRemoveModalOpen && !disabled}
          onClose={(_, closeStatus) => {
						setIsRemoveModalOpen(false)
						if (closeStatus === ModalCloseStatus.CONFIRMED && onRemove) {
							onRemove(item, index)
						}
					}}
      />}
			<StyledItemListRow {...props}>
				<StyledItemMain onClick={() => setIsModalOpen(true)}>
					{children}
				</StyledItemMain>
				{onRemove && <StyledItemRemoveButton onClick={() => tryOpenModal(() => setIsRemoveModalOpen(true))}>
            <StyledRemoveButton $disabled={disabled || false}/>
        </StyledItemRemoveButton>}
			</StyledItemListRow>
		</>
	)
}

interface IItemListRowProps<TItem> extends ComponentProps<"div"> {
	disabled?: boolean;
	item: TItem
	index: number
	modalRender: (initialValue: TItem, close: (returnValue: TItem, closeStatus?: ModalCloseStatus) => void) => ReactNode
	onItemSelected?: (item: TItem, index: number) => TItem;
	onRemove?: (item: TItem, index: number) => void;
}