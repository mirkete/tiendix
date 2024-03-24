import { logUser } from "../../../context/Users/Application"
import { ReactUsersRepository } from '../../../context/Users/Infrastructure/ReactUsersRepository.js'

export const updateEmail = (value, updater, formData) => {
	updater({
		...formData,
		email: value
	})
}

export const updatePassword = (value, updater, formData) => {
	updater({
		...formData,
		password: value
	})
}

export const makeLogin = async (formData, navigate, setFormData) => {
	await logUser(ReactUsersRepository, formData)
	.then(() => {
			navigate("/")
	})
	.catch((err) => {
			console.log(err)
			setFormData({
					email: "",
					password: ""
			})
	})
}