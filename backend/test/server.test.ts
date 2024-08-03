import { server } from "../src/server"
import Prisma from "../src/db";

jest.mock('../src/db', () => ({
  __esModule: true,
  default: {
    entry: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn()
    },
  },
}));

it('should fetch entries', async () => {
  const entries = [{id:"string",title:"string",description:"string",created_at:"2024-01-01T00:00:00.000Z",scheduled_date:"2024-01-01T00:00:00.000Z"}];
  (Prisma.entry.findMany as jest.Mock).mockResolvedValue(entries);
  const response = await server.inject({
    method: 'GET',
    url: '/get/'
  })

  expect(JSON.parse(response.payload)).toEqual(entries), 
  expect(response.statusCode).toEqual(200), 
  expect(Prisma.entry.findMany).toHaveBeenCalledTimes(1);
});

it('should fetch a single entry - success', async () => {
  const entry = {id:"string",title:"string",description:"string",created_at:"2024-01-01T00:00:00.000Z",scheduled_date:"2024-01-01T00:00:00.000Z"};
  (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(entry);
  const response = await server.inject({
    method: 'GET',
    url: '/get/1'
  })
  expect(JSON.parse(response.payload)).toEqual(entry)
  expect(response.statusCode).toEqual(200);
  expect(Prisma.entry.findUnique).toHaveBeenCalledWith({ where: { id: "1" } })
});

it('should fetch a single entry - failed', async () => {
  (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(null);
  const response = await server.inject({
    method: 'GET',
    url: '/get/1',
  })
  expect(response.statusCode).toEqual(500) 
  expect(response.json()).toEqual({ msg: `Error finding entry with id 1` })
  expect(Prisma.entry.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
});

it('should post a single entry - success', async () => {
  const entry = {id:"string",title:"string",description:"string",created_at:"2024-01-01T00:00:00.000Z",scheduled_date:"2024-01-01T00:00:00.000Z"};
  (Prisma.entry.create as jest.Mock).mockResolvedValue(entry);
  const response = await server.inject({
    method: 'POST',
    url: '/create/',
    payload: {
      title: 'string',
      description: 'string',
      created_at: '2024-01-01',
      scheduled_date: '2024-01-01'
    },
  })
  expect(response.statusCode).toEqual(200) 
  expect(JSON.parse(response.payload)).toEqual(entry)
  expect(Prisma.entry.create).toHaveBeenCalledWith({ data: expect.objectContaining({
    title: 'string',
    description: 'string',
    created_at: new Date('2024-01-01'),
    scheduled_date: new Date('2024-01-01')
  }) });
});

it('should post a single entry - failed', async () => {
  (Prisma.entry.create as jest.Mock).mockRejectedValue(new Error);
  const response = await server.inject({
    method: 'POST',
    url: '/create/',
    payload: {
      title: 'string',
      description: 'string',
      created_at: '2024-01-01',
      scheduled_date: '2024-01-01'
    },
  })
  return expect(response.statusCode).toEqual(500), expect(response.json()).toEqual({"msg": "Error creating entry"});
});

it('should delete an entry - success', async () => {
  const response = await server.inject({
    method: 'DELETE',
    url: '/delete/1'
  })
  return expect(response.statusCode).toEqual(200), expect(response.json()).toEqual({ msg: "Deleted successfully" });
});

it('should delete an entry - failed', async () => {
  (Prisma.entry.delete as jest.Mock).mockRejectedValue(new Error);
  const response = await server.inject({
    method: 'DELETE',
    url: '/delete/1'
  })
  return expect(response.statusCode).toEqual(500), expect(response.json()).toEqual({"msg": "Error deleting entry"});
});

it('should update an entry - success', async () => {
  const response = await server.inject({
    method: 'PUT',
    url: '/update/1',
    payload: {
      title: 'string',
      description: 'string',
      created_at: '2024-01-01',
      scheduled_date: '2024-01-01'
    },
  })
  return expect(response.statusCode).toEqual(200), expect(response.json()).toEqual({ msg: "Updated successfully" });
});

it('should update an entry - failed', async () => {
  (Prisma.entry.update as jest.Mock).mockRejectedValue(new Error('Error updating entry'));
  const response = await server.inject({
    method: 'PUT',
    url: '/update/1',
    payload: {
      title: 'string',
      description: 'string',
      created_at: '2024-01-01',
      scheduled_date: '2024-01-01'
    },
  })
  return expect(response.statusCode).toEqual(500), expect(response.json()).toEqual({"msg": "Error updating"});
});


