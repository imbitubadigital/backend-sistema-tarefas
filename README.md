# Back-end Sistema de Tarefas

Implementação realizada por: **Antonio Joaquim Fernandes**
- Contato: **imbitubadigital@gmail.com**

# Requisitos solicitados:

 - Cadastro de Usuários
 - Login
 - Cadastro de Categorias
 - Cadastro de Tarefas por categoria


## Setup

Execute o seguinte comando na raíz do projeto **beckend** para instalar dependências:

```bash
npm install
```

### Migrations

Para criação das tabelas renomeie o arquivo **.env-exemple** para apenas **.env** . OBS: Por padrão deixamos configurado para funcionar com o banco Postgres, dessa forma deve configurar as seguintes variáveis de ambiente:

 - DB_HOST=
 - DB_PORT=
 - DB_USER=
 - DB_PASSWORD=
 - DB_DATABASE=tasks

  Observe que deixamos como padrão o nome do banco como **tasks**. Após criá-la no seu ambiente você pode rodar o comando:


```js
adonis migration:run
```


### Rodando o servidor

Agora basta executar o seguinte comando:

```js
adonis serve --dev
```

Agora sugerimos que acesse [Sistema de Tarefas](https://rocketseat.com.br) e siga as instruções de instalação do front da aplicação