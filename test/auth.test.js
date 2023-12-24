const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../app")

// Assertion style
chai.should()

chai.use(chaiHttp)


describe("Auth api", ()=>{
    // Testing the get route
    describe("Get auth/login", ()=>{
        it("it should get an error message", done =>{
            chai.request(server)
            .post("/auth/login")
            .send({
                "email":"jesnal@mailinator.com",
                "password":"12345"
            })
            .end((err, response)=>{
                // console.log(response.body)
                response.should.have.status(401);
                response.body.should.be.a("object");
                response.body.should.have.property("status").eql("failed");

                done();
            })
        })
        it("it should get an success message", done =>{
            chai.request(server)
            .post("/auth/login")
            .send({
                "email":"jesnal@mailinator.com",
                "password":"12345678"
            })
            .end((err, response)=>{
                // console.log(response.body)
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("status").eql("success");
                response.body.should.have.property("data").be.a('object');
                response.body.data.should.have.property("token");
                done();
            })
        })
    })
})