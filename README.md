# OMVA WebSite

A plataforma digital da Ordem dos Médicos Veterinários de Angola (OMVA) é uma ferramenta essencial para a representação, regulação e promoção da profissão veterinária em Angola. Este projeto visa salvaguardar os interesses profissionais dos membros e contribuir para a saúde pública, sanidade animal e segurança alimentar.

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **CMS:** [Antbox CMS](https://antbox.io) com Integração [Lightray](https://github.com/zafir-co-ao/lightray)
- **Conteúdo:** [Nuxt Content](https://content.nuxt.com/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Testes:** [Vitest](https://vitest.dev/)

## 🔐 Área Administrativa

O projeto inclui uma área reservada para gestão de conteúdos e administração, acessível através do caminho:

- **URL:** `/-/a`

Esta área utiliza a biblioteca `Lightray` para descoberta e gestão de documentos e metadados diretamente integrados com o Antbox CMS.

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone git@github.com:zafir-co-ao/omva-website.git
cd omva-website
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um ficheiro `.env` na raiz do projeto baseado no `.env.example`:

```plaintext
# CMS Antbox
ANTBOX_URL=https://seu-antbox.url
ANTBOX_TENANT=seu-tenant

# SMTP (Envio de Formulários)
SMTP_HOST=mail.provedor.com
SMTP_PORT=465
SMTP_USER=contato@omvangola.co.ao
SMTP_PASS=sua_senha_secreta
```

## 💻 Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

O site ficará disponível em: [http://localhost:3000](http://localhost:3000)

### Outros Comandos

- `npm run build`: Prepara a aplicação para produção.
- `npm run preview`: Pré-visualiza o build de produção localmente.
- `npm run test`: Executa os testes unitários com Vitest.

## 📦 Gestão de Artefactos (Antbox)

Para publicar definições de aspectos e imagens no CMS:

```bash
./.config/antbox-script.sh
```

Pode passar variáveis de ambiente para customizar a execução:
`ANTBOX_URL="url" ANTBOX_TENANT="tenant" ROOT_PASSWORD="pass" ./.config/antbox-script.sh`

## 🌐 Produção e Deploy

O deploy é automatizado via **GitHub Actions** para a plataforma **Vercel**.

### Processo de Deploy

O deploy para produção é acionado pela criação de uma nova tag de versão:

1. Crie uma tag:
   ```bash
   git tag v1.0.0
   ```
2. Envie a tag para o repositório:
   ```bash
   git push origin v1.0.0
   ```

O workflow no GitHub tratará de realizar o build e o deploy para a Vercel automaticamente.
