# Location API Documentation

## Tech Stack
- Framework: Express.js (Node.js)
- Database: MongoDB
- API Documentation: Swagger (uncompleted)
- Node.js version:  v20.10.0
- npm version: 10.4.0
- tests: e2e (incomplete)

## Setup
- In case of soft setup
```
 npm install && npm audit fix
```
- In case of using other versions of npm or some dependency issues, suggestion to use
```
npm install --legacy-peer-deps
or
npm install --force
```
### Run app
```
npm run watch-dev
```

## Location Data
- location_id
- name
- description
- category
- rating
- review_count
- latitude
- longitude
- created_at
- updated_at

## Endpoints

### 1. Creating a Location Document
- Endpoint: <mark style="background-color: #FFFF00">/api/locations</mark>
- Method: POST
- Response:
  - location_id
  - message (optional)

### 2. Paginated Retrieval of All Documents
- Endpoint: /api/locations
- Method: GET
- Parameters:
  - page (default: 1): Page number for pagination.
  - page_size (default: 10): Number of locations per page.
- Response:
  - Paginated list of locations with details

### 3. Retrieval of a Specific Location Document by ID
- Endpoint: /api/locations/{location_id}
- Method: GET
- Path Parameters:
  - location_id: Unique identifier of the location.
- Response:
  - Detailed information about the specific location

### 4. Paginated Retrieval of Location Documents Based on Category
- Endpoint: /api/locations
- Method: GET
- Query Parameters:
  - category: The category of locations to be retrieved.
  - page (default: 1): Page number for pagination.
  - page_size (default: 10): Number of locations per page.
- Response:
  - Paginated list of locations within the specified category, with details similar to the second endpoint.

### 5. Updating a Location Document by Its ID
- Endpoint: /api/locations/{location_id}
- Method: PATCH
- Path Parameters:
  - location_id: Unique identifier of the location.
- Response:
  - A message indicating the completion or reason of failure of the update.

### 6. Updating Location Documents by Their Category
- Endpoint: /api/locations
- Method: PATCH
- Query Parameters:
  - category: The category of locations to be updated.
- Response:
  - A message indicating the completion or reason of failure of the update, and the number of affected documents.

### 7. Deleting a Location Document by Its ID
- Endpoint: /api/locations/{location_id}
- Method: DELETE
- Path Parameters:
  - location_id: Unique identifier of the location.
- Response:
  - A message indicating the completion or reason of failure of the deletion.
  
### 8. Create the user record with authorization token
- Endpoint: /api/users/create
- Method: POST
- Response:
  - A new user with bearer token (which used for protect PATCH and DELETE endpoints) or fail message.