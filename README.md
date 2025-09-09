

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
		"_postman_id": "0f7e6042-ff35-453b-8615-cbcf142c3650",
		"name": "Biblioteca API",
		"description": "Collection da API Biblioteca Escolar",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "39778665",
		"_collection_link": "https://api-biblioteca-3856.postman.co/workspace/Api-biblioteca-Workspace~0e11ea21-84d2-44dc-8b22-c5e8edf66eaa/collection/39778665-0f7e6042-ff35-453b-8615-cbcf142c3650?action=share&source=collection_link&creator=39778665"
	},
	"item": [
		{
			"name": "Auth - Register",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"disabled": true
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"name\": \"estudante\",\n  \"email\": \"estudante@biblioteca.com\",\n  \"password\": \"12345678\",\n  \"role\": \"STUDENT\"\n}\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{base_url}}/users",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "Auth - Login",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"let jsonData = pm.response.json();\r",
							"pm.environment.set(\"jwt\", jsonData.access_token);\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"email\": \"estudante@biblioteca.com\",\n  \"password\": \"12345678\"\n}\n"
				},
				"url": {
					"raw": "{{base_url}}/auth/login",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Users - Buscar Usuário",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer {{jwt}}"
					}
				],
				"url": {
					"raw": "{{base_url}}/users/2",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"users",
						"2"
					]
				}
			},
			"response": []
		},
		{
			"name": "Users - Admin Only",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer {{jwt}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"email\": \"admin@biblioteca.com\",\r\n  \"password\": \"admin123\"\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{base_url}}/users/admin-only",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"users",
						"admin-only"
					]
				}
			},
			"response": []
		},
		{
			"name": "Books - Criar Livro (ADMIN)",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					},
					{
						"key": "Authorization",
						"value": "Bearer {{jwt}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"title\": \"exemplo de livro 2\",\n  \"author\": \"Antoine de Saint-Exupéry\",\n  \"category\": \"Infantil\"\n}\n"
				},
				"url": {
					"raw": "{{base_url}}/books",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"books"
					]
				}
			},
			"response": []
		},
		{
			"name": "Books - Listar Livros",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{base_url}}/books",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"books"
					]
				}
			},
			"response": []
		},
		{
			"name": "Loans - Borrow",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					},
					{
						"key": "Authorization",
						"value": "Bearer {{jwt}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"bookId\": 1,\n  \"borrowerId\": 5\n}"
				},
				"url": {
					"raw": "{{base_url}}/loans/borrow",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"loans",
						"borrow"
					]
				}
			},
			"response": []
		},
		{
			"name": "Loans - Return (ADMIN/TEACHER)",
			"request": {
				"method": "PATCH",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"disabled": true
					},
					{
						"key": "Authorization",
						"value": "Bearer {{jwt}}"
					}
				],
				"url": {
					"raw": "{{base_url}}/loans/return/5",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"loans",
						"return",
						"5"
					]
				}
			},
			"response": []
		}
	],
	"variable": [
		{
			"key": "base_url",
			"value": "http://localhost:3000"
		},
		{
			"key": "jwt",
			"value": ""
		}
	]
}