import {Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import {AxiosResponse} from "axios";
import {MutateOptions, UseMutateFunction} from "@tanstack/react-query";

export type MutationResponseStateOptionType<Response, Request> = {
	setResponseState?: Dispatch<SetStateAction<Response>>;
	mutateOptions?: MutateOptions<AxiosResponse<Response>, Error, Request>
}

export const useMutationResponseState = <Response, Request>(
	mutateFn: UseMutateFunction<AxiosResponse<Response>, Error, Request>,
	options?: MutationResponseStateOptionType<Response, Request>
) => {
	const [response, setResponse] = useState<Response>();

	// useEffect(() => { // TODO Fix multi-layer nesting
	// 	console.log(mutateFn);
	// }, [mutateFn]);

	const memoizedOptions = useMemo(() => options, [options]);

	const mutate = useCallback((value: Request) => {
		mutateFn(value, {
			...memoizedOptions,
			onSuccess: (data, vars, context) => {
				memoizedOptions?.mutateOptions?.onSuccess?.(data, vars, context);
				memoizedOptions?.setResponseState?.(data.data);
				setResponse(data.data);
			},
		});
	}, [memoizedOptions, mutateFn]);

	return {response, mutate};
}
