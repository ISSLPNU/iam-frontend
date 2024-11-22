import {ComponentProps, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {ModalCloseStatus} from "./modalCloseStatus.ts";
import {useClickOutside} from "../../../hooks/useClickOutside.tsx";
import _ from "lodash";

const StyledModalWrapper = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background: #00000099
`

const StyledModal = styled.div`
    background: #111;

    padding: 20px;

    border-radius: 20px;
		
		width: max-content;
		height: max-content;
`

export const Modal = <T, >({onClose, isOpen, initialValue, render, ...props}: Omit<IModalProps<T>, "children">) => {
	const [data, setData] = useState<T | undefined>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement>(null);
	const modalParent = document.getElementById("modal-parent");
	const dropdownParent = document.getElementById("dropdown-parent")

	const close = useCallback((returnValue: T, closeStatus?: ModalCloseStatus) => {
		if (isModalOpen) {
			if (onClose) {
				onClose(returnValue, closeStatus || ModalCloseStatus.CANCELED);
			}
			setIsModalOpen(false);
		}
	}, [isModalOpen, onClose])

	useClickOutside(modalRef, {
		ignoreParents: [dropdownParent],
		ignoreEvents: !isModalOpen
	}, () => close(data || {} as T));

	useEffect(() => {
		if (isOpen) {
			setData(_.cloneDeep(initialValue));
			setIsModalOpen(true);
		} else {
			close(data || {} as T);
		}
	}, [close, initialValue, isOpen]);

	return (
		modalParent && isModalOpen && createPortal(
			<StyledModalWrapper>
				<StyledModal {...props} ref={modalRef}>
					{render(data || {} as T, close)}
				</StyledModal>
			</StyledModalWrapper>,
			modalParent
		)
	)
}

interface IModalProps<T> extends ComponentProps<"div"> {
	isOpen: boolean
	initialValue?: T
	onClose?: (returnedValue: T, closeStatus: ModalCloseStatus) => void
	render: (initialValue: T, close: (returnValue: T, closeStatus?: ModalCloseStatus) => void) => ReactNode
}
