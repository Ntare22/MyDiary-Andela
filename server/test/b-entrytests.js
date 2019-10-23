import chai from "chai";
import chaiHttp from "chai-http";
import index from "../index";
import {
    entryData
} from "../helpers/entryData";

const {
    expect
} = chai;
chai.use(chaiHttp);

let userToken;

describe('POST entries ,/api/v1/entries', () => {
    beforeEach((done) => {
        chai.request(index).post('/api/v1/auth/signin').send({
            email: "jim@gmail.com",
            password: "ntare12345",
        }).then((res) => {
            console.log(res.body.token)
            userToken = res.body.token;
            done();
        })
            .catch((err) => console.log(err));
    });
    it('should return entry created successfully ', (done) => {
        chai.request(index)
            .post('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[0])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('should return title should be a string ', (done) => {
        chai.request(index)
            .post('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[1])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal('"title" must be a string');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('should return description should be a string ', (done) => {
        chai.request(index)
            .post('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[2])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal('"description" must be a string');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('should return "title" is required ', (done) => {
        chai.request(index)
            .post('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[3])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal('"title" is not allowed to be empty');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('should return "title" is required ', (done) => {
        chai.request(index)
            .post('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[4])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal('"title" length must be less than or equal to 20 characters long');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

})

describe('PATCH entries ,/api/v1/entries/:entryId', () => {
    it('should return entryId is invalid ', (done) => {
        chai.request(index)
            .patch('/api/v1/entries/1')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[5])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('should return entryId is invalid ', (done) => {
        chai.request(index)
            .patch('/api/v1/entries/100')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send(entryData[5])
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

})

describe('DELETE entries ,/api/v1/entries/:entryId', () => {
    it('should return entryId has been deleted ', (done) => {
        chai.request(index)
            .patch('/api/v1/entries/1')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
})

describe('GET entries ,/api/v1/entries', () => {
    it('should return all entries ', (done) => {
        chai.request(index)
            .get('/api/v1/entries')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
})

describe('GET entries ,/api/v1/entries/entryId', () => {
    it('should return all entries ', (done) => {
        chai.request(index)
            .get('/api/v1/entries/1')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal(200);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
})