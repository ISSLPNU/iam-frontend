import {ReactNode} from "react";
import styled, {css} from "styled-components";
import {Button} from "../../../common/button";
import {ModalCloseStatus} from "../../../modal/modal/modalCloseStatus.ts";
import {Label} from "../../../common/label";
import {ItemListRow} from "./itemListRow.tsx";

const StyledItemsListField = styled.div<{ $invalid: boolean }>`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 4px;
    border-radius: 10px;
    gap: 4px;
    background: #222;

    border: 1px solid transparent;

    ${props => props.$invalid && css`
        border-color: red;
    `}
`;

const StyledItemListFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledTopPart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    margin-bottom: 5px;
`;

const StyledAddButton = styled(Button)`
    height: 35px;
`

export const ItemsList = <TItem, >(
	{
		labelText,
		showAddButton = false,
		itemRender,
		createNewItem,
		itemModalRender,
		onItemSelected,
		onAddNewItem,
		onRemoveItem,
		items,
		disabled = false,
		...props
	}: Omit<IItemsListProps<TItem>, "render">
) => {

	return (
		<StyledItemListFieldWrapper {...props}>
			<StyledTopPart>
				<Label>{labelText}</Label>
				{showAddButton && (
					<StyledAddButton
						themeStyle="success"
						disabled={disabled}
						onClick={onAddNewItem}
					>
						Add series
					</StyledAddButton>
				)}
			</StyledTopPart>
			<StyledItemsListField $invalid={false}>
				{items && items.length > 0 ? (
					items.map((item: TItem, index: number) => (
						<ItemListRow<TItem>
							key={index}
							item={item}
							index={index}
							onItemSelected={onItemSelected}
							onRemove={onRemoveItem}
							modalRender={itemModalRender}>
							{itemRender(item, index)}
						</ItemListRow>
					))
				) : (
					<div style={{fontSize: 16}}>Missing available items...😵</div>
				)}
			</StyledItemsListField>
		</StyledItemListFieldWrapper>
	)
}

type IItemsListProps<TItem> = {
	showAddButton?: boolean;
	disabled?: boolean;
	onAddNewItem?: () => void;
	onRemoveItem?: (item: TItem, index: number) => void;
	items?: TItem[];
	labelText?: string;
	itemRender: (item: TItem, index: number) => ReactNode;
	itemModalRender: (initialValue: TItem, close: (returnValue: TItem, closeStatus?: ModalCloseStatus) => void) => ReactNode
	createNewItem?: () => TItem;
	onItemSelected?: (item: TItem, index: number) => TItem;
}
