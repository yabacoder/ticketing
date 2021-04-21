import axios from "axios";
const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are not signed in</h1>
	);
};

LandingPage.getInitialProps = async ({ req }) => {
	if (typeof window === "undefined") {
		// we are on the server
		// requests should be made to nginx namespace
		const { data } = await axios.get(
			// use the kubernetes namespace to select the servie to send the request to on the server side
			"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
			{
				headers: req.headers,
			}
		);
		return data;
	} else {
		// we are on the browser
		// request can be made with base url of ''
		const { data } = await axios.get("/api/users/currentuser");

		return data;
	}

	return {};
};

export default LandingPage;

/**
 * 
 * const client = buildClient(context);
	const { data } = await client.get("/api/users/currentuser");

	return data;
 */
