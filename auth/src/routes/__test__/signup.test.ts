import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);

	//expect(response.body.email).toEqual("test@test.com");
});

it("returns a 400 with an invalid email", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "testtest.com",
			password: "password",
		})
		.expect(400);

	//expect(response.body.email).toEqual("testtest.com");)
});

it("returns a 400 with an invalid password", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "p",
		})
		.expect(400);

	//expect(response.body.email).toEqual("testtest.com");)
});

it("returns a 400 with missing email and password", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({})
		.expect(400);

	//expect(response.body.email).toEqual("testtest.com");)
});

it("disallows duplicate emails", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);

	await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(400);
});

it("sets cookie after successful sign up", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);

	expect(response.get("Set-Cookie")).toBeDefined();
});
