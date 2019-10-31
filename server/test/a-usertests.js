import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import {
    userData
} from "../helpers/userData";

const {
    expect
} = chai;
chai.use(chaiHttp);

describe('1 . POST signup ', () => {
    it("should return first name is required", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[0])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return last name is required", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[1])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return email is required", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[2])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return password is required", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[3])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
    })

    it("should return user created successfully", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[4])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                done();
            })
    })

    it("should return user's email in use", (done) => {
        chai.request(index)
            .post('/api/v1/auth/signup')
            .send(userData[4])
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
            .post('/api/v1/auth/signin')
            .send(userData[5])
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(201);
                expect(res.body.status).to.equal(201);
                done();
            })
    })
})