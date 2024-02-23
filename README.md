### Task Management
Este projeto gerencia as tarefas de um time.

### Como usar?
1. Clone o repositório:
    ```
    git clone https://github.com/LeiteEduardo/task-management.git
    ``` 
2. Acesse a pasta do projeto:
    ```
    cd task-management
    ```
2. Instale as dependencias do projeto
    ```
    composer install
    ```
3. Gere o arquivo .env:
    ```
    cp .env.example .env
    ```
4. Configure as váriaveis de ambiente relacionadas ao banco de dados:
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=
    ```
5. Gere a base de dados com o seguinte comando:
    ```
    php artisan migrate --seed
    ```
6. Gere a APP_KEY do seu projeto:
    ```
    php artisan key:generate
    ```
7. Acesse a aplicação utilizando o seguinte acesso gerado:
    ```
    Login: admin@email.com
    Password: 12345678
    ```