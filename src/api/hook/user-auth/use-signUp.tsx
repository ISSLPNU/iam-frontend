import {useMutation} from "@tanstack/react-query";
import {IUserSignUp} from "../../entity/user.ts";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";


export const useSignUp = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "signUp"],
		mutationFn: (request: IUserSignUp) => userAuthService.singUp(request),
	})

	const {mutate: signUp, response} = useMutationResponseState(mutate)

	return {signUp, mutate, response, ...props};
}