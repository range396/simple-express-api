import request from 'supertest';
import app from '../test.server';

describe('GET /api/locations/1', () => {
    it('Responds with JSON of single record from locations document', async () => {
        const response = await request(app).get('/api/locations/3');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "foundLocation": {
                "_id": "65db44b13f1c8b3c482f53f1",
                "location_id": 3,
                "name": "EBqBIg",
                "created_at": "2024-02-25T13:46:25.782Z",
                "updated_at": "2024-02-25T13:46:25.784Z",
                "__v": 0
            }
        });
    });
});

describe('GET /api/locations?page_size=3&page=1', () => {
    it('Responds the 3 records based on \'page\' and \'page_size\' query parameters', async () => {
        const response = await request(app).get('/api/locations?page_size=3&page=1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "has_more": true,
            "locations": [
                {
                    "_id": "65db44b13f1c8b3c482f53f1",
                    "location_id": 3,
                    "name": "EBqBIg",
                    "created_at": "2024-02-25T13:46:25.782Z",
                    "updated_at": "2024-02-25T13:46:25.784Z",
                    "__v": 0
                },
                {
                    "_id": "65db44d535a3f01a914cde0c",
                    "location_id": 4,
                    "name": "4Cu8hu",
                    "created_at": "2024-02-25T13:47:01.329Z",
                    "updated_at": "2024-02-25T13:47:01.332Z",
                    "__v": 0
                },
                {
                    "_id": "65db44f91a408f54a01102ee",
                    "location_id": 5,
                    "name": "sfcUc7",
                    "created_at": "2024-02-25T13:47:37.552Z",
                    "updated_at": "2024-02-25T13:47:37.555Z",
                    "__v": 0
                }
            ],
            "pageCount": 10,
            "itemCount": 28,
            "pages": [
                {
                    "number": 1,
                    "url": "/api/locations?page_size=3&page=1&limit=10"
                },
                {
                    "number": 2,
                    "url": "/api/locations?page_size=3&page=2&limit=10"
                },
                {
                    "number": 3,
                    "url": "/api/locations?page_size=3&page=3&limit=10"
                },
                {
                    "number": 4,
                    "url": "/api/locations?page_size=3&page=4&limit=10"
                },
                {
                    "number": 5,
                    "url": "/api/locations?page_size=3&page=5&limit=10"
                },
                {
                    "number": 6,
                    "url": "/api/locations?page_size=3&page=6&limit=10"
                },
                {
                    "number": 7,
                    "url": "/api/locations?page_size=3&page=7&limit=10"
                },
                {
                    "number": 8,
                    "url": "/api/locations?page_size=3&page=8&limit=10"
                },
                {
                    "number": 9,
                    "url": "/api/locations?page_size=3&page=9&limit=10"
                },
                {
                    "number": 10,
                    "url": "/api/locations?page_size=3&page=10&limit=10"
                }
            ]
        });
    });
});