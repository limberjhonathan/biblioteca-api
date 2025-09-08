

## Projeto

### .env

```env
DATABASE_URL="mysql://root:root@localhost:3306/biblioteca_db"
JWT_SECRET="75c265c0793140ac3cbbe3dcb3ba003e"
JWT_EXPIRATION="3600s"
PORT=3000
```

### Docker Compose (`docker-compose.yml`)
```markdown
version: "3.9"

services:
  mysql:
    image: mysql:8.1
    ports:
      - 3307:3306
    volumes:
      - ./backup:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
 
```

  ---
  
  ## Postman Collection (`biblioteca-api.postman_collection.json`)
  
  ---
```json
{
  "info": {
    "name": "Biblioteca API",
    "_postman_id": "9d8f7c0e-1234-4abc-9876-abcdef123456",
    "description": "Collection da API Biblioteca Escolar",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth - Register",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "url": "{{base_url}}/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Aluno Teste\",\n  \"email\": \"aluno@test.com\",\n  \"password\": \"123456\",\n  \"role\": \"STUDENT\"\n}"
        }
      }
    },
    {
      "name": "Auth - Login",
      "request": {
        "method": "POST",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "url": "{{base_url}}/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"aluno@test.com\",\n  \"password\": \"123456\"\n}"
        }
      }
    },
    {
      "name": "Users - Buscar Usuário",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{jwt}}" }],
        "url": "{{base_url}}/users/2"
      }
    },
    {
      "name": "Users - Admin Only",
      "request": {
        "method": "GET",
        "header": [{ "key": "Authorization", "value": "Bearer {{jwt}}" }],
        "url": "{{base_url}}/users/admin-only"
      }
    },
    {
      "name": "Books - Criar Livro (ADMIN)",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{jwt}}" }
        ],
        "url": "{{base_url}}/books",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"1984\",\n  \"author\": \"George Orwell\",\n  \"category\": \"Distopia\"\n}"
        }
      }
    },
    {
      "name": "Books - Listar Livros",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/books"
      }
    },
    {
      "name": "Loans - Borrow",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{jwt}}" }
        ],
        "url": "{{base_url}}/loans/borrow",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"bookId\": 1,\n  \"borrowerId\": 2\n}"
        }
      }
    },
    {
      "name": "Loans - Return (ADMIN/TEACHER)",
      "request": {
        "method": "PATCH",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          { "key": "Authorization", "value": "Bearer {{jwt}}" }
        ],
        "url": "{{base_url}}/loans/return/1"
      }
    }
  ],
  "variable": [
    { "key": "base_url", "value": "http://localhost:3000" },
    { "key": "jwt", "value": "" }
  ]
}
