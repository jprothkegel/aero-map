import request from 'supertest';
import server from '../app';

describe('GET /api/v1/map', () => {

  afterAll(() => {
    server.close();
  });

  describe('when bbox is correct', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit=20&bbox=13.394844532012941,52.51667788396363,13.408191204071047,52.52333677944541',
      );
      expect(response.statusCode).toBe(200);
    });
  });

  describe('when bbox is missing', () => {
    test('should respond with a 500 status code', async () => {
      const response = await request(server).get('/api/v1/map?limit20');
      expect(response.statusCode).toBe(500);
    });
  });

  describe('when bbox is too big', () => {
    test('should respond with a 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit20&bbox=-31.812383,-11.129855,5.277461,30.793792',
      );
      expect(response.statusCode).toBe(500);
    });
  });

  describe('when bbox is not what is expected', () => {
    test('should respond with a 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit20&bbox=abc',
      );
      expect(response.statusCode).toBe(500);
    });
  });

  describe('when limit is too big', () => {
    test('should respond with 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit=101&bbox=13.394844532012941,52.51667788396363,13.408191204071047,52.52333677944541',
      );
      expect(response.statusCode).toBe(500);
    });
  });

  describe('when limit is too small', () => {
    test('should respond with 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit=0&bbox=13.394844532012941,52.51667788396363,13.408191204071047,52.52333677944541',
      );
      expect(response.statusCode).toBe(500);
    });
    test('should respond with 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit=-10&bbox=13.394844532012941,52.51667788396363,13.408191204071047,52.52333677944541',
      );
      expect(response.statusCode).toBe(500);
    });
  });

  describe('when limit is not a number', () => {
    test('should respond with 500 status code', async () => {
      const response = await request(server).get(
        '/api/v1/map?limit=-abc&bbox=13.394844532012941,52.51667788396363,13.408191204071047,52.52333677944541',
      );
      expect(response.statusCode).toBe(500);
    });
  });
});
