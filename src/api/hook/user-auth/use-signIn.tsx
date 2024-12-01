import {useMutation} from "@tanstack/react-query";
import {userAuthService} from "../../service/user-auth-service.ts";
import {useMutationResponseState} from "../../../hook/useMutationResponseState.tsx";
import {IUserSignIn} from "../../entity/user.ts";


export const useSignIn = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["user", "auth", "signIn"],
		mutationFn: (request: IUserSignIn) => userAuthService.signIn(request),
	})

	const {mutate: signIn, response} = useMutationResponseState(mutate)

	return {signIn, mutate, response, ...props};
}