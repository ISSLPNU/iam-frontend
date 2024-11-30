import {ReactNode, useRef} from "react";
import {FieldPath, FieldValues, useController} from "react-hook-form";
import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import styled, {css} from "styled-components";
import {Upload2Icon, X2Icon} from "../../../icons/mainIcons.tsx";

const StyledImageWrapper = styled.div`
    position: relative;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    max-width: 100%;
    max-height: 100%;
`;

const StyledInputWrapper = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    top: 0;
    left: 0;

    gap: 5px;

    width: 100%;
`;

const StyledPreviewWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    max-width: 100%;
    max-height: 100%;

    overflow: hidden;
`;

const StyledInput = styled.input`
    position: absolute;
    z-index: -999;
    display: block;
    height: 0;
    width: 0;
    opacity: 0;
`;

const StyledUploadButton = styled.label<{ $disabled?: boolean, $uploaded?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 5px 15px;

    border-radius: 10px;

    gap: 8px;

    transition: ease-in-out .2s;

    color: #36aed7;
    background-color: #00a8de33;

    font-size: 18px;

    cursor: pointer;

    & svg > path {
        stroke: #36aed7;
        transition: ease-in-out .2s;
    }

    &:hover {
        background-color: #00a8de55;
    }

    ${props => props.$uploaded && css`
        color: #38d963;
        background-color: #38d96333;

        & svg > path {
            stroke: #38d963;
        }

        &:hover {
            background-color: #38d96355;
        }
    `}

    ${props => props.$disabled && css`
        color: #555555;
        background-color: #202020;

        cursor: default;

        &:hover {
            background-color: #202020;
        }

        & svg > path {
            stroke: #555555;
        }
    `}
`;

const StyledRemoveButton = styled.div`
    position: absolute;

    top: 5px;
    left: 5px;

    & svg {
        height: 40px;
        width: 40px;

        & path {
            stroke: red;
            stroke-width: 3px;
        }
    }
`;

export const UploadImageField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		renderPreview,
		hideUploadButton,
		onFileAdd,
		accept,
		...props
	}: UploadImageFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">
) => {
	const {field} = useController({name: props.name, control: props.control})
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<FormField
			{...props}
			render={({id}) => (
				<StyledImageWrapper>
					<StyledPreviewWrapper>
						{field.value && renderPreview && renderPreview({imageUrl: field.value})}
						{!field.disabled && (
							<StyledRemoveButton onClick={() => field.onChange(undefined)}>
								<X2Icon/>
							</StyledRemoveButton>
						)}
					</StyledPreviewWrapper>

					<StyledInputWrapper>
						{hideUploadButton || (
							<StyledUploadButton $disabled={field.disabled} $uploaded={field.value}>
								<Upload2Icon/>
								{!field.value ? "Upload" : "Uploaded"}

								<StyledInput
									disabled={field.disabled}
									type="file"
									id={id}
									ref={inputRef}
									accept={accept || "image/*"}
									onChange={(e) => {
										const file = e.target.files?.[0];

										if (file && onFileAdd) {
											onFileAdd(file, {
												onUploaded: (url) => {
													field.onChange(url)
													if (inputRef.current) {
														inputRef.current.value = '';
													}
												}
											})
										}
									}}
								/>
							</StyledUploadButton>
						)}
					</StyledInputWrapper>
				</StyledImageWrapper>
			)}
		/>
	)
}

export type UploadImageActions = {
	onUploaded: (url: string) => void
}

type UploadImageFieldProps = {
	hideUploadButton?: boolean;
	accept?: string;
	renderPreview(data: { imageUrl: string, file?: File }): ReactNode;
	onFileAdd?: (file: File, actions: UploadImageActions) => void;
};
