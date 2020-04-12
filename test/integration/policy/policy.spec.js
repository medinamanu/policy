import request from 'supertest'
import nock from 'nock'
import { OK } from 'http-status'
import chai, {expect} from 'chai';
import server from '../../../src/server';


describe('GET /policy', () => {
  beforeEach(() => {
    nock('http://localhost:10120')
      .get('/policy')
      .reply(OK, '')
  })

  it('should responds with 200 status code', () => {
    return request(server)
      .get('/policy')
      .expect(OK)
  })

  it('should responds json as data format', () => {
    return request(server)
      .get('/policy')
      .expect('Content-Type', /json/)
  })
})
