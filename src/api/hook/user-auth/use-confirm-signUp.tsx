import {useMutation} from "@tanstack/react-query";
import {IAuthenticationActionRequest} from "../../entity/user.ts";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";


export const useConfirmSignUp = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "confirmSignUp"],
		mutationFn: (request: IAuthenticationActionRequest) => userAuthService.confirmSignUp(request),
	})

	const {mutate: confirmSignUp, response} = useMutationResponseState(mutate)

	return {confirmSignUp, mutate, response, ...props};
}