# 🚇 Fetch Train Data

API para buscar dados de status das linhas de trens e metrô da região metropolitana de São Paulo.

## 📋 Sobre o Projeto

Este projeto fornece uma API unificada para consultar o status operacional de todas as linhas de trens e metrô de São Paulo, agregando dados de múltiplas operadoras em um único endpoint padronizado.

### Linhas Suportadas

| Linha | Cor       | Operadora           |
| ----- | --------- | ------------------- |
| 1     | Azul      | Metrô               |
| 2     | Verde     | Metrô               |
| 3     | Vermelha  | Metrô               |
| 4     | Amarela   | CCR (ViaMobilidade) |
| 5     | Lilás     | CCR (ViaMobilidade) |
| 6     | Laranja   | LinhaUni            |
| 7     | Rubi      | TIC Trens           |
| 8     | Diamante  | CCR (ViaMobilidade) |
| 9     | Esmeralda | CCR (ViaMobilidade) |
| 10    | Turquesa  | CPTM                |
| 11    | Coral     | CPTM                |
| 12    | Safira    | CPTM                |
| 13    | Jade      | CPTM                |
| 15    | Prata     | Metrô               |

## 🛠️ Tecnologias

- **[Bun](https://bun.sh/)** - Runtime JavaScript
- **[Next.js 16](https://nextjs.org/)** - Framework React
- **[Elysia](https://elysiajs.com/)** - Framework de API
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[happy-dom](https://github.com/capricorn86/happy-dom)** - DOM virtual para scraping

## 🚀 Começando

### Pré-requisitos

- [Bun](https://bun.sh/) instalado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gsbenevides2/fetch-train-data.git

# Entre no diretório
cd fetch-train-data

# Instale as dependências
bun install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
AUTH_SECRET=sua_chave_secreta_aqui
```

### Executando

```bash
# Modo desenvolvimento
bun run dev

# Build para produção
bun run build

# Executar em produção
bun run start
```

A API estará disponível em `http://localhost:3000`.

## 📖 Documentação da API

A documentação OpenAPI/Swagger está disponível em `/api/openapi`.

### Autenticação

Todas as rotas (exceto `/api/health`) requerem autenticação via header:

```
Authorization: sua_chave_secreta
```

### Endpoints

#### `GET /api/processed-data`

Retorna o status de todas as linhas de forma padronizada.

**Resposta:**

```json
[
  {
    "codigo": 1,
    "cor": "Azul",
    "situacao": "Normal",
    "status": "OK",
    "descricao": ""
  },
  {
    "codigo": 2,
    "cor": "Verde",
    "situacao": "Velocidade Reduzida",
    "status": "WARNING",
    "descricao": "Lentidão entre as estações X e Y"
  }
]
```

**Status possíveis:**

| Status     | Descrição                                                                    |
| ---------- | ---------------------------------------------------------------------------- |
| `OK`       | Operação normal                                                              |
| `WARNING`  | Operação com restrições (velocidade reduzida, circulação diferenciada, etc.) |
| `CRITICAL` | Operação paralisada                                                          |
| `UNKNOWN`  | Status desconhecido ou operação encerrada                                    |

#### `GET /api/brute-data/:company`

Retorna os dados brutos da API de uma operadora específica.

**Parâmetros:**

- `company`: `metro`, `cptm`, `ccr`, `tic` ou `liauni`

#### `GET /api/brute-data/all`

Retorna os dados brutos de todas as operadoras.

#### `GET /api/health`

Health check para monitoramento (não requer autenticação).

## 🐳 Docker

```bash
# Build da imagem
docker build -t fetch-train-data .

# Executar container
docker run -p 3000:3000 -e AUTH_SECRET=sua_chave fetch-train-data
```

## 📁 Estrutura do Projeto

```
app/
├── api/
│   └── [...slug]/
│       └── route.ts       # Rotas da API (Elysia)
├── lib/
│   ├── ccr/               # Integração com API da CCR
│   ├── cptm/              # Integração com API da CPTM
│   ├── liauni/            # Integração com API da LinhaUni
│   ├── metro/             # Scraping do site do Metrô
│   ├── tic/               # Integração com API do TIC Trens
│   └── processedData/     # Processamento e padronização dos dados
├── plugins/
│   └── coolify-healtcheker/  # Plugin de health check
├── services/
│   └── AuthService.ts     # Serviço de autenticação
└── utils/
    ├── getEnv.ts          # Utilitário para variáveis de ambiente
    └── getProjectInfo.ts  # Informações do projeto
```

## 🔗 Fontes de Dados

- **Metrô SP**: Scraping de https://www.metro.sp.gov.br
- **CPTM**: API oficial https://api.cptm.sp.gov.br
- **CCR/ViaMobilidade/Via Quatro**: API https://webapi.grupoccr.com.br
- **TIC Trens**: API https://www.tictrens.com.br
- **LinhaUni**: API https://www.linhauni.com.br

## 👤 Autor

**Guilherme da Silva Benevides**

- GitHub: [@gsbenevides2](https://github.com/gsbenevides2)
- Website: https://github.com/gsbenevides2

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
