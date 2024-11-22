export interface IOption<T> {
	name: string
	value: T
	color?: {
		light?: string
		dark?: string
	}
}