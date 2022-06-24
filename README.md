<h1 align="center">Synvia Service</h1>
<p align="center">API com endpoints para criação de usuários, autenticação, autorização, e por fim simulação de testes toxicológicos</p>
<p align="center"><a href="https://synvia-toxicology.herokuapp.com/api/"><b>🔗 Demo com Swagger</b></a></p>

## 🔧 Instalação e Testes

1. Você precisará ter o Node.js instalado junto com o Docker


2. Instalação

```bash
  # Clona o projeto para sua máquina
  git clone https://github.com/lucasgsz/synvia-toxicology

  # Entra na pasta do projeto
  cd synvia-toxicology

  # Instala as dependências
  yarn
```

4. Deixei um arquivo docker para você subir o banco de dados (Postgres)

```bash
  # Sobe o container docker
  docker compose up -d
```

3. Crie um arquivo .env na raiz do projeto preenchendo as informações descritas no [.env.example](https://github.com/lucasgsz/synvia-toxicology/blob/main/.env.example) (Caso tenha usado o Docker, coloque as credenciais do Postgres que está no container)

4. Iniciar servidor

```bash
  # Roda as migrations
  yarn migrate:dev

  # Inicia o servidor em modo de desenvolvimento
  yarn start:dev

  # O servidor abrirá na porta 3000.
  # Você pode acessar a documentação com Swagger em http://localhost:3000/api/

  # Para visualizar o banco de dados
  yarn prisma studio
```
5. Executar Testes unitários 

```bash
  # Roda todos os testes unitarios usando o jest
  yarn jest

```
