import {useMutation} from "@tanstack/react-query";
import {IUserRestorePassword} from "../../entity/user.ts";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";


export const useRestorePasswordConfirm = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "restorePasswordConfirm"],
		mutationFn: (request: IUserRestorePassword) => userAuthService.restorePasswordConfirm(request),
	})

	const {mutate: restorePasswordConfirm, response} = useMutationResponseState(mutate)

	return {restorePasswordConfirm, mutate, response, ...props};
}