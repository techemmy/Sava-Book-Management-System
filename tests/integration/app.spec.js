const app = require("../../src/app")
const request = require("supertest")

test("should run app succesfully", async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(200)
})
