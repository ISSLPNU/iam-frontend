import {useParams} from "react-router-dom";
import {ActionToken} from "../api/entity/auth-tokens/action-token.ts";
import {jwtDecode} from "jwt-decode";

export const useAuthActionToken = (reqParam: string) => {
	const params = useParams()

	if (!params[reqParam]) {
		throw Error(`Token ${params[reqParam]}`)
	}

	const actionToken: ActionToken = jwtDecode(params[reqParam])

	if (!actionToken.ACTION) {
		throw Error(`Token ${actionToken}`)
	}

	return {token: params[reqParam], actionToken}
}