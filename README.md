# Aplicação Web CodeRace

## Visão Geral

CodeRace é uma aplicação web desenvolvida para gerenciar dados de funcionários, registrar horários de trabalho e lidar com autenticação de usuários e gerenciamento de perfis. A aplicação inclui rotas públicas e privadas, com acesso baseado em funções para diferentes funcionalidades.

## Funcionalidades

- Autenticação de usuário (Login, Cadastro, Recuperação de Senha)
- Gerenciamento de perfis de funcionários
- Registro e acompanhamento de horários de trabalho
- Diferenciação de funções de administrador e funcionário com permissões de acesso distintas
- Tratamento de erros e feedback ao usuário

## Estrutura do Projeto

- **src/pages/public**: Contém páginas acessíveis ao público, como login, cadastro, recuperação de senha, política de privacidade, e termos de uso.
- **src/pages/app**: Inclui páginas protegidas destinadas a usuários autenticados, como dados do funcionário, perfil do funcionário, e registro de ponto.
- **src/shared**: Contém componentes compartilhados, contextos, esquemas de validação, serviços e tipos utilizados em toda a aplicação.

## Pré-requisitos

- Node.js (versão mais recente recomendada)
- npm (gerenciador de pacotes do Node)
- Docker (para executar a aplicação em um ambiente contêinerizado)

## Instalação

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/murilothom/coderace-web.git
   ```
   
2. **Navegar até o diretório do projeto:**
   ```bash
   cd coderace-web
   ```

3. **Instalar as dependências:**
   ```bash
   npm install
   ```

4. **Executar a aplicação localmente:**
   ```bash
   npm run start:dev
   ```

## Uso de Docker

Para rodar a aplicação utilizando Docker:

1. **Construir a imagem do Docker:**
   ```bash
   docker build -t coderace-web .
   ```

2. **Rodar o contêiner:**
   ```bash
   docker run -p 5173:5173 coderace-web
   ```

## Configuração do Ambiente

- **Variáveis de ambiente**: Configure as variáveis de ambiente necessárias em um arquivo `.env` na raiz do projeto.
- **Configuração do Docker**: Utilize o arquivo `docker-compose.yml` para configurar serviços adicionais, se necessário.
