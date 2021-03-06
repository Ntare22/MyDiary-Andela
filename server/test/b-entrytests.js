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

describe('POST entries ,/api/v2/entries', () => {
  beforeEach((done) => {
    chai.request(index).post('/api/v2/auth/signin').send({
      email: "jim@gmail.com",
      password: "ntare12345",
    }).then((res) => {
      userToken = res.body.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return entry created successfully ', (done) => {
    chai.request(index)
      .post('/api/v2/entries')
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
      .post('/api/v2/entries')
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
      .post('/api/v2/entries')
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
    const data = { title: "", description: "salfdjapkdfhpiughpidufad" }
    chai.request(index)
      .post('/api/v2/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(data)
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
      .post('/api/v2/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entryData[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" length must be at least 3 characters long');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

})

describe('PATCH entries ,/api/v2/entries/:entryId', () => {
  it('should return entry has been update ', (done) => {
    chai.request(index)
      .patch('/api/v2/entries/1')
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
      .patch('/api/v2/entries/100')
      .set('authorization', userToken)
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

  it('should return token is unavailable ', (done) => {
    chai.request(index)
      .patch('/api/v2/entries/wsoiwe')
      .set('authorization', 'invalid')
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

  it('should return no values provided to update ', (done) => {
    chai.request(index)
      .patch('/api/v2/entries/1')
      .set('authorization', userToken)
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

describe('GET entries ,/api/v2/entries', () => {
  it('should return all entries ', (done) => {
    chai.request(index)
      .get('/api/v2/entries')
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

  it('should return error 400 ', (done) => {
    chai.request(index)
      .get('/api/v2/entries/go')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
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

describe('GET entries ,/api/v2/entries/:entryId', () => {
  it('should return a single entry ', (done) => {
    chai.request(index)
      .get(`/api/v2/entries/${1}`)
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

  it('should not allow user to pass in which is not a number', (done) => {
    chai.request(index)
      .get(`/api/v2/entries/1ojois`)
      .set('authorization', userToken)
      .set('Accept', 'application/json')
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

describe('DELETE entries ,/api/v2/entries/:entryId', () => {
  it('should return entryId has been deleted ', (done) => {
    chai.request(index)
      .delete('/api/v2/entries/1')
      .set('authorization', userToken)
      .then((res) => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return entryId is invalid ', (done) => {
    chai.request(index)
      .delete('/api/v2/entries/10')
      .set('authorization', userToken)
      .then((res) => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return entryId is invalid ', (done) => {
    chai.request(index)
      .delete('/api/v2/entries/1')
      .then((res) => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
})

