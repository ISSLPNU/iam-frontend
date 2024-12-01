import {useMutation} from "@tanstack/react-query";
import {IAuthenticationActionRequest} from "../../entity/user.ts";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";


export const useTwoFactorConfirm = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "twoFactorConfirm"],
		mutationFn: (request: IAuthenticationActionRequest) => userAuthService.twoFactorConfirm(request),
	})

	const {mutate: twoFactorConfirm, response} = useMutationResponseState(mutate)

	return {twoFactorConfirm, mutate, response, ...props};
}