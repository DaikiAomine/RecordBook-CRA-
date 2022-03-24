import React, { useEffect } from "react";

const LoginPage = () => {
	useEffect(() => {
		fetch('/api/hello');
	}, []);

	return(
			<p>This is the login page</p>
	);
}

export default LoginPage;