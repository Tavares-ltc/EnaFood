#  EnaFood :motor_scooter::hotdog::fries:

A API EnaFood é um sistema escalável de delivery voltado para ramo alimentício. Com a API é possível obter produtos que estão disponíveis para compra tal como manipular os produtos da sacola (adicionando ou alterando quantidades).

## Como executar o projeto

### * Usando o Docker Compose

1. Clone o repositório em sua máquina local  -  `https://github.com/Tavares-ltc/EnaFood.git`
2. Dentro da pasta raiz do projeto você terá duas opções:
  * Caso queira executar o projeto com o banco de dados limpo: -  `docker-compose up`
  * Caso queira executar o seed no projeto e criar data fake nos restaurante e pratos: - `docker-compose -f docker-compose-seed.yml up`

### * Nativamente

1. Clone o repositório em sua máquina local  -  `https://github.com/Tavares-ltc/EnaFood.git`
2. Dentro da pasta raiz do projeto execute: -  `npm i`
3. Duplique o arquivo .env.exemple e renomeie para .env
4. Atribua valores as variáveis de ambiente no arquivo .env:
  - `PORT=(Porta em que seu projeto irá abrir)`
  - `DATABASE_URI=(Connection string para seu banco MongoDB OBS: Pode utilizar o Atlas caso não tenha o banco localmente)`
  - `TOKEN_SECRET=(Token utilizado para codificar os tokens de usuário)`
5. Duas opções para executar o projeto:
* Para executar como dev: - `npm run dev`
* Para buildar o projeto: - `npm run build` & `npm run start`

## Tecnologias utilizadas (Justificativa)


- Node.js: Node.js é uma plataforma de desenvolvimento de aplicações backend em JavaScript. Era requisito do projeto, mas é uma opção popular e eficiente para construir servidores web escaláveis e de alto desempenho. 
- Express: O Express é um framework web para Node.js que simplifica o processo de criação de APIs e rotas. Foi escolhido por oferecer um conjunto de ferramentas e recursos para lidar com solicitações HTTP, o que por sua vez agiliza o projeto.
- MongoDB: O MongoDB é um banco de dados NoSQL orientado a documentos. Tal como o Node.js estava entre os requisitos, mas é um ótimo banco para lidar com grande volume de dados não estruturados ou que podem mudar sua estrutura futuramente. 
- Mongoose: É um ODM (Object Document Mapper), que traz algumas funcionalidades a mais e facilita a utilização do MongoDB. Foi utilizado principalmente pelas vantagens de desenvolvimento, mas estou ciente que é menos performático que o driver nativo do MongoDB.
- Cors: Foi utilizado para lidar com as questões de segurança do navegador relacionada à política de mesmo-origem (same-origin policy).
- Jsonwebtoken:Jsonwebtoken é uma biblioteca para geração e verificação de tokens de autenticação JWT (JSON Web Tokens). Foi escolhido para criar sessões de login e gerar rotas autenticadas.
- Joi: É uma biblioteca de validação de dados em JavaScript. Foi utilizado por conseguir dar um retorno mais rápido ao cliente de que existem erros no formato de envio.
- Bcrypt: É uma biblioteca utilizada para criptografar senhas. Foi utilizado para que não fosse necessário salvar senhas de usuários no banco.
- Jest: É uma biblioteca de testes. Foi utilizada para realizar testes de integração que garantem que o retorno das rotas testadas permanecerá igual durante futuras atualizações, ajudando a identificar erros.
- Ts-Jest: Um pacote para utilizar o Jest com o typescript.
- falso: Uma biblioteca para gerar dados falsos, tanto na criação do seed quando nos testes de integração.
- Typecript(dev dependencie): Ë um superconjunto de JavaScript que adiciona recursos de tipagem estática ao código. Foi escolhido para ajudar a sustentar a escalabilidade do projeto, em vista de mais desenvolvedores trabalhando na api.
- Ts-node(dev dependencie): Ts-node é um pacote que permite executar arquivos TypeScript diretamente no Node.js, sem a necessidade de compilar o código para JavaScript antes. Foi utilizado em conjunto com a tecnologia abaixo para agilizar o desenvolvimento.
- Nodemon(dev dependencie):Nodemon é uma ferramenta que monitora alterações em arquivos durante o desenvolvimento de uma aplicação Node.js. Foi utilizado com a tecnologia acima para reiniciar a plicação asism que alterações fossem feitas no código.

### Considerações: 

O projeto até então foi projetado para o funcionamento do lado do cliente, isso é tem rotas referentes a utilização de um usuário que busca comprar um produto. Por mais que o banco de dados conte com as informações necessárias para o gerenciamento de todo o serviço, ainda é necessário criar e discutir a elaboração das demais rotas como criação de restaurantes, produtos e confirmações dos pedidos por parte do restaurante. A discussão da abordagem do modelo de negócio dessa etapa, tal como da arquitetura do projeto é um ponto importante para o contexto de escalabilidade do projeto.
</br>

<details>

<summary><strong>Documentação</strong></summary>

## Usuários

### Cria um usuário


```http
  POST /signup
```

- Request Body

```
{
  "name": "username"
  "email": "user@email.com",
  "password": "12345678",
  "phone"?: "5500123456789", 
  "address":[{
  state: "State",
  city: "City",
  street: "Street, number"
  zip: "zip code"
  complement?: "complement if necessary"
  }]
}
```
  OBS: A chave "address" representa um conjunto de endereços preferidos do usuário, a ideia é que ao final de um pedido, escolha um dos endereços aqui adicionados.

- Response

```
Created
```

### Faz o login

```http
  POST /signin
```

- Request Body

```
{
  "email": "user@email.com",
  "password": "12345678"
}
```

- Response

```
{
  "token": "JWT token"
}
```
  
 OBS: Esse token, deverá ser enviado nas rotas autenticadas por meio de headers no formato: "authorization": "Bearer {token}"

### Retorna 50 produtos de uma página

```http
  GET /products?page=1
```

- Response

```
[
  {
    "_id": "codigo id do produto",
		"name": "nome do produto",
		"description": "descrição do produto",
		"category": "categoria",
		"image": "endereço de imagem",
		"price": 7028,
		"restaurant_id": "codigo id do restaurante",
		"__v": 0
  }
]
```
  OBS: O preço é armazenado *100 para evitar o uso de decimais.
  
  
  ### Retorna 50 produtos de uma página filtrando por uma categoria

```http
  GET /products/:category?page=1
``` 

- Response

```
[
  {
    "_id": "codigo id do produto",
		"name": "nome do produto",
		"description": "descrição do produto",
		"category": "categoria",
		"image": "endereço de imagem",
		"price": 7028,
		"restaurant_id": "codigo id do restaurante",
		"__v": 0
  }
]
```
  OBS: O preço é armazenado *100 para evitar o uso de decimais.


### Cria um pedido - (rota autenticada)

```http
  POST /order
```

- Request Body

```
{
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
"payment_method": "forma de pagamento",
"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
}
}
```

- Response

```
{
	"user_id": "codigo id do usuario",
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
		{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
	"payment_method": "debit",
	"status": "creating",
	"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
},
	"total_price": 198000,
	"_id": "codigo id do pedido",
	"date": "timestamp do pedido",
	"__v": 0
}
```

### Retorna os pedidos de um usuário, 50 por pagina, filtrando por pelo tipo de status (rota autenticada)

```http
  GET /order?page=1&status=creating
```
- Response

```
[
  {
	"user_id": "codigo id do usuario",
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
		{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
	"payment_method": "debit",
	"status": "creating",
	"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
},
	"total_price": 198000,
	"_id": "codigo id do pedido",
	"date": "timestamp do pedido",
	"__v": 0
}
]
```

### Modifica um pedido - (rota autenticada)

```http
  PUT /order/:orderId
```

- Request Body

```
{
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
"payment_method": "forma de pagamento",
"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
}
}
```

- Response

```
{
	"user_id": "codigo id do usuario",
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
		{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
	"payment_method": "debit",
	"status": "creating",
	"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
},
	"total_price": 198000,
	"_id": "codigo id do pedido",
	"date": "timestamp do pedido",
	"__v": 0
}
```

### Muda o status do pedido para "waiting_for_approval", deixando a cargo do restaurante aprovar ou não.

```http
  PATCH /order/:orderId/created
```

- Response

```
{
	"user_id": "codigo id do usuario",
	"products": [
		{
			"product_id": "codigo id do produto",
			"amount": 4
		},
		{
			"product_id": "codigo id do produto",
			"amount": 2
		}
	],
	"payment_method": "debit",
	"status": "waiting_for_approval",
	"delivery_address": {
	"state": "Estado",
  "city": "Cidade",
	"street": "Rua, numero",
  "zip": "cep"
},
	"total_price": 198000,
	"_id": "codigo id do pedido",
	"date": "timestamp do pedido",
	"__v": 0
}
```
</details>
