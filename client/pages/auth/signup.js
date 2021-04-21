import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { doRequest, errors } = useRequest({
		url: "/api/users/signup",
		method: "post",
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push("/"),
	});

	const onSubmit = async event => {
		event.preventDefault();

		await doRequest();
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<h1>Signup </h1>
				<div className="form-group">
					<label> Email Address</label>
					<input
						className="form-control"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label> Password</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="form-control"
					/>
				</div>
				{errors}

				<button className="btn btn-primary" role="submit">
					Sign up
				</button>
			</form>
		</div>
	);
};
