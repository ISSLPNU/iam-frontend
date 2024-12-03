import {RefObject, useCallback, useEffect, useMemo} from "react";

type ClickOutsideProperties = {
	ignoreParents?: (HTMLElement | null)[];
	ignoreEvents?: boolean;
	maxParentDepth?: number;
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  properties: ClickOutsideProperties,
  handler: (event?: Event) => void
) => {

	const props = useMemo(() => {
		return {
			ignoreParents: [],
			maxParentDepth: 3,
			ignoreEvents: false,
			...properties
		};
	}, [properties])


	const isClickedParent = useCallback((target: Node): boolean => {
		if (target.parentElement) {
			let currentParent = target.parentElement;
			for (let i = 0; i < props.maxParentDepth; ++i) {
				if (currentParent && props.ignoreParents.includes(currentParent)) {
					return true;
				}
				if (currentParent?.parentElement) {
					currentParent = currentParent.parentElement
				} else {
					return false;
				}
			}
		}
		return false
	}, [props.ignoreParents, props.maxParentDepth])

	const listener = useCallback((event: Event) => {
		if (props.ignoreEvents) return;

		const el = ref?.current;

		if (!el || el.contains((event?.target as Node) || null) || isClickedParent(event?.target as Node)) {
			return;
		}
		handler(event);
	}, [handler, isClickedParent, props.ignoreEvents, ref])
	
	useEffect(() => {
		if (props?.ignoreEvents) {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		} else {
			document.addEventListener('mousedown', listener)
			document.addEventListener('touchstart', listener)
		}

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
	}, [ref, handler, props, listener])
}
