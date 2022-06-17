/* describe("first test", () => {
    it("should return true",()=>{
        expect(true).toBe(true);
    })
}) */

import request from 'supertest'
import { server } from '../index'

describe('Сценарий 1', () => {
  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })
})