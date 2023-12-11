export const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX =
	/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
export const PHONE_REGEX_WITH_COUNTRY_CODE =
	/^\+?\d{1,3}?[- .]?\(?[\d]{3}\)?[- .]?[\d]{3}[- .]?[\d]{4}$/;
export const PHONE_REGEX_WITHOUT_COUNTRY_CODE =
	/^(?:\d{3}[-.\s]??|\(\d{3}\)[-.\s]??)?\d{3}[-.\s]??\d{4}$/;
