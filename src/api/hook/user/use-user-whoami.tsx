import {useMutation} from "@tanstack/react-query";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";
import {userService} from "../../service/user-service.ts";

export const useUserWhoami = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "whoami"],
		mutationFn: () => userService.whoami(),
	})

	const {mutate: userWhoami, response} = useMutationResponseState(mutate)

	return {userWhoami, mutate, response, ...props};
}