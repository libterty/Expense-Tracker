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
        agent.get('/trackers/5d846fb5d2b4c83f26031db7/edit').then(res2 => {
          expect(res2.status).to.be.eql(200)
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
        agent.get('/trackers/1231231231231231231/edit').then(res2 => {
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
          .put('/trackers/5d846fb5d2b4c83f26031db7/edit')
          .type('form')
          .send({
            _method: 'put',
            name: '中餐',
            category: 'foods',
            date: '2019-09-16T05:05:24.064Z',
            merchant: '中市飲茶',
            amount: 2320
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
        email: 'lib1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent
          .post('/trackers/new')
          .type('form')
          .send({
            _method: 'post',
            name: '測試支出2',
            category: 'foods',
            date: '2019/02/20',
            merchant: '中市飲茶',
            amount: 2100
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
        email: 'lib1@example.com',
        password: '12345678'
      })
      .then(res1 => {
        agent
          .delete('/trackers/5d848a7e7aa2224827d04419/delete?_method=DELETE')
          .then(res2 => {
            expect(res2.status).to.be.eql(200)
            done()
          })
      })
  })
})
