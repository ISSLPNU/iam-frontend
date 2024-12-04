import {useMutation} from "@tanstack/react-query";
import {oAuthService} from "../../service/oauth-service.ts";
import {IOAuthSignInRequest} from "../../entity/oauth.ts";

export const useOAuthLogin = () => {
	const {mutate, ...props} = useMutation({
		mutationKey: ["oauth", "google"],
		mutationFn: (data: IOAuthSignInRequest) => oAuthService.oAuthLogin(data),
	})

	return {oAuthLogin: mutate, ...props};
}