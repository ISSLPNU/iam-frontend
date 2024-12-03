import {useMutation} from "@tanstack/react-query";
import {userService} from "../../service/user-service.ts";


export const useToggleTFA = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "tfa"],
		mutationFn: (enabled: boolean) => userService.toggleTFA(enabled),
	})

	return {toggleTFA: mutate, ...props};
}