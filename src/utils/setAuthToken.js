import axios from "axios";

const setAuthToekn = token => {
	if (token) {
		//apply auth token to every request if logged in
		axios.defaults.haeders.common["Authorization"] = token;
	} else {
		//delete auth header
		delete axios.defaults.headers.common["Authorization"];
	}
}

export default setAuthToken;
