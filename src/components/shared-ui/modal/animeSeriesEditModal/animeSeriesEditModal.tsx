import {ComponentProps} from "react";
import {Modal} from "../modal/modal.tsx";

export const AnimeSeriesEditModal = ({...props}: IAnimeSeriesEditModalProps) => {
	return (
		<Modal {...props}>

		</Modal>
	)
}

interface IAnimeSeriesEditModalProps extends ComponentProps<typeof Modal> {

}