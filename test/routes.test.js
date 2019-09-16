const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const should = chai.should()
const expect = chai.expect

if (!global.Promise) {
  global.Promise = require('q')
}

describe('GET /trackers', () => {
  it('should return succees with user login', done => {
    chai
      .request('http://localhost:3001')
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .end((err, res) => {
        should.not.exist(err)
        expect(res).to.redirectTo('http://localhost:3001/')
        done()
      })
  })

  it('should return 200 if the session keep success', done => {
    const agent = chai.request.agent('http://localhost:3001')
    agent
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent.get('/trackers/5d7f1814432781cca3cc3771').then(res2 => {
          res2.should.have.status(200)
          done()
        })
      })
  })

  it('should return 400 if the restaurant is not exist', done => {
    const agent = chai.request.agent('http://localhost:3001')
    agent
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent.get('/trackers/1231231231231231231').then(res2 => {
          expect(res2.status).to.be.eql(400)
          done()
        })
      })
  })

  it('should return 200 if the edit is success', done => {
    const agent = chai.request.agent('http://localhost:3001')
    agent
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent
          .put('/trackers/5d7732fc11207c1fe8bc4a97/edit')
          .type('form')
          .send({
            _method: 'put',
            name: '修改測試支出1',
            category: '修改支出類別',
            date: '修改測試時間',
            amount: '修改支出金額'
          })
          .then(res2 => {
            expect(res2.status).to.be.eql(200)
            done()
          })
      })
  })

  it('should return 200 if create is success', done => {
    const agent = chai.request.agent('http://localhost:3001')
    agent
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent
          .post('/trackers/new')
          .type('form')
          .send({
            _method: 'post',
            name: '測試支出2',
            category: '支出類別',
            date: '測試時間',
            amount: '支出金額'
          })
          .then(res2 => {
            expect(res2.status).to.be.eql(200)
            done()
          })
      })
  })

  // selecting a objectId in ur database each of time before you process testing, _id will never be the same
  it('should return 200 if delete is success', done => {
    const agent = chai.request.agent('http://localhost:3001')
    agent
      .post('/users/login')
      .type('form')
      .send({
        _method: 'post',
        email: 'user1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent
          .delete('/trackers/5d7e1d41f38328af0b8f3bde/delete?_method=DELETE')
          .then(res2 => {
            expect(res2.status).to.be.eql(200)
            done()
          })
      })
  })
})
