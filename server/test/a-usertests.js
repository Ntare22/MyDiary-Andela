import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import { userData } from "../helpers/userData";
import { signUpData } from "../helpers/createUserData";
import { signInData } from "../helpers/signInData";

const {
    expect
} = chai;
chai.use(chaiHttp);

describe('1 . POST signup ', () => {
    it("should return first name is required", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(userData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return last name is required", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(userData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return email is required", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(userData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return password is required", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(userData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return user created successfully", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(signUpData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                done();
            })
    })

    it("should return user's email in use", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signup')
            .send(signUpData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(409);
                expect(res.body.status).to.equal(409);
                done();
            })
    })
})

describe('2. POST signin ', () => {
    it("should return user logged in successfully", (done) => {
        chai.request(index)
            .post('/api/v2/auth/signin')
            .send(signInData)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
    })
})