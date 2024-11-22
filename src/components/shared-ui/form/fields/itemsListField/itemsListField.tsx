import {ControllerProps, FieldValues, useController} from "react-hook-form";
import {ReactNode} from "react";
import {ItemListRow} from "./itemListRow.tsx";
import styled, {css} from "styled-components";
import {Button} from "../../../common/button";
import {ModalCloseStatus} from "../../../modal/modal/modalCloseStatus.ts";
import {Label} from "../../../common/label";
import {FormField} from "../formField/formField.tsx";

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

export const ItemsListField = <T extends FieldValues, TItem>(
	{
		labelText,
		itemRender,
		createNewItem,
		itemModalRender,
		onItemSelected,
		...props
	}: Omit<IItemsListFieldProps<T, TItem>, "render">
) => {
	const {field} = useController({name: props.name, control: props.control})

	const addNewItem = () => {
		if (field.disabled) return

		const newItem = createNewItem ? createNewItem() : {};
		field.onChange([...field.value || [], newItem]);
	}

	const removeItem = (_: TItem, index: number) => {
		if (field.disabled) return

		const temp = [...field.value]
		temp.splice(index, 1)
		field.onChange(temp)
	}

	return (
		<FormField {...props} render={({field, fieldState}) => (
			<StyledItemListFieldWrapper>
				<StyledTopPart>
					<Label>{labelText}</Label>
					<StyledAddButton
						themeStyle="success"
						disabled={field.disabled}
						onClick={addNewItem}
					>
						Add series
					</StyledAddButton>
				</StyledTopPart>
				<StyledItemsListField $invalid={fieldState.invalid}>
					{field.value && field.value.length > 0 ? (
						field.value.map((item: TItem, index: number) => (
							<ItemListRow<T, TItem>
								key={index}
								item={item}
								index={index}
								field={field}
								onItemSelected={onItemSelected}
								onRemove={removeItem}
								modalRender={itemModalRender}>
								{itemRender(item, index)}
							</ItemListRow>
						))
					) : (
						<div style={{fontSize: 16}}>Missing available items...😵</div>
					)}
				</StyledItemsListField>
			</StyledItemListFieldWrapper>
		)}
		/>
	)
}

type IItemsListFieldProps<T extends FieldValues, TItem> = {
	labelText?: string;
	itemRender: (item: TItem, index: number) => ReactNode;
	itemModalRender: (initialValue: TItem, close: (returnValue: TItem, closeStatus?: ModalCloseStatus) => void) => ReactNode
	createNewItem?: () => TItem;
	onItemSelected?: (item: TItem, index: number) => TItem;
} & ControllerProps<T>
