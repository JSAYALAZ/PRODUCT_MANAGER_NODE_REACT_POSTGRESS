import request from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";

jest.mock('../config/db')

describe('Connect db',()=>{
  test('Should handle database connection error', async()=>{
    jest.spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('ERROR AL CONECTAR A LA DB'))
    const consoleSpy = jest.spyOn(console, 'log')

    await connectDB()
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ERROR AL CONECTAR A LA DB')
    )
  })
})