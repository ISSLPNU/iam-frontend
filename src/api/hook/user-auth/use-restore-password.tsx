import {useMutation} from "@tanstack/react-query";
import {IUserRestorePasswordRequest} from "../../entity/user.ts";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";


export const useRestorePassword = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "restorePassword"],
		mutationFn: (request: IUserRestorePasswordRequest) => userAuthService.restorePassword(request),
	})

	const {mutate: restorePassword, response} = useMutationResponseState(mutate)

	return {restorePassword, mutate, response, ...props};
}