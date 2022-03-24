import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";

const LoginPage = () => {
	const [error, setError] = useState(false);
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');

	useEffect(() => {
		fetch('/api/hello');
	}, []);

	const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(event.target.value);
	};

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if(event.target.value == '') {
			setError(true);
		} else {
			setError(false)
		}
	}

	return(
		<>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>

				<Grid item xs={3}>
				
					<Typography align={"center"}>
						<p>Welcome to your daily journal</p>
					</Typography>
					
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div>
							<TextField
								required
								error={error}
								helperText={error && "Incorrect entry."}
								label="login"
								value={username}
								onChange={handleLogin}
								onBlur={handleBlur} />
						</div>

						<div>
							<TextField
								required
								error={error}
								helperText={error && "Incorrect entry."}
								label="password"
								value={password}
								hidden
								onChange={handlePassword}
								onBlur={handleBlur} />
						</div>
					</Box>
				</Grid>   
			</Grid> 
		</>
	);
}

export default LoginPage;