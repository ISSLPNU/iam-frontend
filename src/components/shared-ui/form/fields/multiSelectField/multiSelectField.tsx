import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import {FieldPath, FieldValues, PathValue, useController} from "react-hook-form";
import {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {BaseFormFieldStyled} from "../../formField/baseFormFieldStyles.tsx";
import {SelectedItem} from "./selectedItem.tsx";
import {ChevronDownIcon, X2Icon} from "../../../icons/mainIcons.tsx";
import {Dropdown} from "../../../activeButtons/dropdownV2";

const StyledDropdown = styled(Dropdown)<{ disabled?: boolean }>`
    ${BaseFormFieldStyled};

    padding: 0;

    height: max-content;

    ${props => props.disabled && css`
        background-color: #191919;
        color: #ccc;
		    
		    &:hover{
            background-color: #191919;
		    }
    `}
}
`

const StyledSelectedItems = styled.div`
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    padding: 5px;

    height: max-content;

    gap: 5px;
`

const StyledDropdownToggle = styled(Dropdown.Toggle)`
    display: flex;

    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;
`

const StyledRightSide = styled.div`
    display: flex;

    flex-direction: row;

    align-self: stretch;

    justify-content: center;
    align-items: center;

    min-width: max-content;
`

const StyledSeparationLine = styled.span`
    box-sizing: border-box;
    align-self: stretch;
    width: 1px;

    margin: 5px 2px;

    background-color: #777;
`

const StyledRemoveAllButton = styled(X2Icon)`
    padding: 5px;

    transition: ease-in-out .2s;

    &:hover {
        & > path {
            stroke: red;
        }
    }
`

const StyledOption = styled.div`
    padding: 2px;

    font-size: 18px;

    border-radius: 5px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        background-color: #181818;
    }
`

const StyledFieldDropdownIcon = styled(ChevronDownIcon)<{ disabled?: boolean }>`
    height: 18px;
    width: 18px;

    ${props => props.disabled && css`
        & > path {
            stroke: #999;
        }
    `}
`

export const MultiSelectField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, OptionType>(
	{
		options,
		placeholder,
		...props
	}: IMultiSelectFieldProps<OptionType> & FormFieldProps<TFieldValues, TName>) => {
	const {field} = useController({name: props.name, control: props.control});
	const [availableOptions, setAvailableOptions] = useState<Option<OptionType>[]>(options || []);

	const removeItem = (item: PathValue<TFieldValues, TName>) => {
		if (field.disabled) return

		const selectedItems: OptionType[] = field?.value || []

		if (selectedItems.length < 1) {
			field.onChange([])
		} else {
			field.onChange(selectedItems.filter((value) => value !== item))
		}
	}

	const removeAllItems = () => {
		if (field.disabled) return
		field.onChange([])
	}

	const selectItem = (item: Option<OptionType>) => {
		if (field.disabled) return
		const selectedItems: OptionType[] = field?.value || []

		if (!selectedItems.includes(item.value)) {
			field.onChange([...field.value || [], item.value])
		}
	}

	useEffect(() => {
		if (options) {
			setAvailableOptions(options.filter(option => !field?.value?.includes(option.value)))
		}
	}, [field?.value, options]);

	return (
		<FormField {...props} disabled={field.disabled} render={({id, field}) => (
			<StyledDropdown id={id} disabled={field.disabled}>
				<StyledDropdownToggle>
					<StyledSelectedItems>
						{field.value?.length > 0 ? (
							<>
								{[...field.value].map((item, index) => (
									<SelectedItem disabled={field.disabled} key={index} onRemove={() => removeItem(item)}>
										{item || "Unknown"}
									</SelectedItem>
								))}
							</>
						) : (
							<div style={{padding: "5px 0"}}>{placeholder || "Select..."}</div>
						)}
					</StyledSelectedItems>

					<StyledRightSide>
						{field.disabled || field.value && (
							<>
								<StyledRemoveAllButton role="button" onClick={removeAllItems}/>
								<StyledSeparationLine/>
							</>
						)}
						<StyledFieldDropdownIcon style={{padding: 2}}/>
					</StyledRightSide>
				</StyledDropdownToggle>

				<Dropdown.Menu>
					{availableOptions.length > 0 ?
						availableOptions.map((option, index) => (
							<StyledOption key={index}
							              onClick={() => selectItem(option)}
							>
								{option.name}
							</StyledOption>
						)) : (
							<div>No options to select</div>
						)}
				</Dropdown.Menu>
			</StyledDropdown>
		)}/>
	)
}

type IMultiSelectFieldProps<OptionType> = {
	options?: Option<OptionType>[]
	placeholder?: string
}

type Option<OptionType> = { name: string; value: OptionType }