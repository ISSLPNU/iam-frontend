export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	tfaEnabled: boolean;
	role: string;
}

export interface IUserCreate {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}