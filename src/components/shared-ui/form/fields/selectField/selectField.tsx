import styled, {css} from "styled-components";
import {FormField, FormFieldProps} from "../formField/formField.tsx";
import {FieldPath, FieldValues, useController} from "react-hook-form";
import {BaseFormFieldStyled} from "../formField/baseFormFieldStyles.tsx";
import {ChevronDownIcon, X2Icon} from "../../../icons/mainIcons.tsx";
import {useEffect, useState} from "react";
import {SelectedItem} from "./selectedItem.tsx";
import {IOption} from "../../../commonTypes.ts";
import {Dropdown} from "../../../activeButtons/dropdownV2";

const StyledDropdown = styled(Dropdown)<{ disabled?: boolean }>`
    ${BaseFormFieldStyled};

    padding: 0;

    height: max-content;

    ${props => props.disabled && css`
        background-color: #191919;
        color: #ccc;

        &:hover {
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

const StyledOption = styled.div<{ $colors?: { light?: string, dark?: string } }>`
    padding: 2px;

    font-size: 18px;

    border-radius: 5px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${props => props.$colors?.dark || "#fffff"};
        //background-color: ${props => props.$colors?.light || "#ffffff10"};

    &:hover {
        background-color: #181818;
    }
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

const StyledSeparationLine = styled.span`
    box-sizing: border-box;
    align-self: stretch;
    width: 1px;

    margin: 5px 2px;

    background-color: #777;
`

const StyledFieldDropdownIcon = styled(ChevronDownIcon)<{ disabled?: boolean }>`
    height: 18px;
    width: 18px;

		padding: 2px;
		
    ${props => props.disabled && css`
        & > path {
            stroke: #999;
        }
    `}
`


export const SelectField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, OptionType>(
	{
		avoidDefaultValue,
		placeholder,
		options,
		...props
	}: ISelectFieldProps<OptionType> & FormFieldProps<TFieldValues, TName>) => {
	const {field} = useController({name: props.name, control: props.control});
	const [selectedOption, setSelectedOption] = useState<IOption<OptionType>>();

	let close = () => {
		console.error("loh")
	}

	const selectItem = (item?: IOption<OptionType>) => {
		if (field.disabled) return

		field.onChange(item?.value)
		close()
	}

	useEffect(() => {
		if (field.value === undefined && options && options.length > 0 && !avoidDefaultValue) {
			field.onChange(options[0].value)
		}
		setSelectedOption(options?.find((option) => option.value === field.value))
	}, [field, options]);

	return (
		<FormField {...props} disabled={field.disabled} render={({id, field}) => (
			<StyledDropdown id={id} disabled={field.disabled} getProperties={({toggle}) => {close = toggle}}>
				<StyledDropdownToggle>
					<StyledSelectedItems>
						{field.value ? (
							<SelectedItem disabled={field.disabled} colors={selectedOption?.color}>
								{selectedOption?.name || "Not selected"}
							</SelectedItem>
						) : (
							<div style={{padding: "5px 0"}}>{placeholder || "Select..."}</div>
						)}
					</StyledSelectedItems>
					<StyledRightSide>
						{field.disabled || field.value && avoidDefaultValue && (
							<>
								<StyledRemoveAllButton role="button" onClick={() => selectItem(undefined)}/>
								<StyledSeparationLine/>
							</>
						)}
						<StyledFieldDropdownIcon/>
					</StyledRightSide>
				</StyledDropdownToggle>

				<Dropdown.Menu>
					{options && options.length > 0 ?
						options.map((option, index) => (
							<StyledOption key={index}
							              onClick={() => selectItem(option)}
							              $colors={option.color}
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

type ISelectFieldProps<OptionType> = {
	placeholder?: string
	avoidDefaultValue?: boolean
	options?: IOption<OptionType>[]
}
