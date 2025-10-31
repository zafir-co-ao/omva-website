# OMVA WebSite

A OMVA WebSite é um projeto desenvolvido para a Ordem dos Médicos Veterinários de Angola (OMVA), com o objetivo de fornecer uma plataforma digital que represente e regule a profissão veterinária em Angola. Este site é uma ferramenta essencial para promover o progresso técnico e científico, salvaguardar os interesses profissionais dos membros da OMVA e contribuir ativamente para a saúde pública, sanidade animal e higiene alimentar sustentável.

## 🚀 Instalação e Configuração

### 1. Instalar dependências

No diretório do projeto, executar:

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Criar um ficheiro `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
# CMS Antbox
ANTBOX_URL=
ANTBOX_TENANT=

# SMTP
SMTP_HOST=mail.minhaempresa.com
SMTP_PORT=465
SMTP_USER=contato@minhaempresa.com
SMTP_PASS=senha_super_secreta
```

> ⚠️ **Nota:** Nunca exponha credenciais sensíveis em repositórios públicos.  
> Utilize variáveis de ambiente seguras ou serviços de gestão de secrets em produção.

## 💻 Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O site ficará disponível em: [http://localhost:3000](http://localhost:3000)

## 📦 Publicação de Artefactos no CMS (Antbox)

### Ambiente de Desenvolvimento

```bash
npm run antbox-script [antbox-url] [antbox-tenant]
```

Se os parâmetros não forem fornecidos, os valores por omissão serão:

- `ANTBOX_URL=http://localhost:7180`
- `ANTBOX_TENANT=omva-website`

### Produção

```bash
npm run antbox-script [antbox-url] [antbox-tenant]
```

## 🌐 Produção

### 1. Gerar build do projeto

Criar uma tag

```bash
git tag v*.*.*
```

> Ex.: git tag v1.0.0

Depois, executar:

```bash
git push origin v*.*.*
```

> Ex.: git push origin v1.0.0

### 2. Pré-visualizar produção localmente

```bash
npm run preview
```

O site ficará disponível em: [http://localhost:4173](http://localhost:4173) _(por omissão do Vite)_
