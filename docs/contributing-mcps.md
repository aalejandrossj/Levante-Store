# Contributing MCPs

This guide helps you (or your AI assistant) add new MCPs to the catalog.

## Quick Start

1. Create/use a service folder: `src/modules/mcps/data/mcps/[service]/`
2. Add `_meta.json` if it's a new service
3. Add your MCP file: `official.json` or `community-[name].json`
4. Validate: `npm run validate-mcps`
5. Open a Pull Request

## Complete Examples

### Example 1: STDIO MCP with NPX (Node.js)

**Playwright MCP** - No credentials required:

`src/modules/mcps/data/mcps/playwright/_meta.json`:
```json
{
  "service": "playwright",
  "displayName": "Playwright",
  "description": "Browser automation and testing",
  "website": "https://playwright.dev",
  "icon": "playwright",
  "category": "automation"
}
```

`src/modules/mcps/data/mcps/playwright/official.json`:
```json
{
  "$schema": "../_schema.json",
  "id": "playwright",
  "name": "Playwright",
  "description": "Browser automation for testing and web scraping",
  "category": "automation",
  "icon": "playwright",
  "logoUrl": "https://playwright.dev/img/playwright-logo.svg",
  "source": "official",
  "maintainer": {
    "name": "Microsoft",
    "url": "https://playwright.dev",
    "github": "microsoft"
  },
  "status": "active",
  "version": "latest",
  "transport": "stdio",
  "inputs": {},
  "configuration": {
    "template": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "env": {}
    }
  },
  "metadata": {
    "homepage": "https://playwright.dev/docs/mcp",
    "repository": "https://github.com/microsoft/playwright-mcp",
    "addedAt": "2025-01-01",
    "lastUpdated": "2025-01-01"
  }
}
```

### Example 2: STDIO MCP with UVX (Python)

**Docling MCP** - Python package with `--from` flag:

`src/modules/mcps/data/mcps/docling/_meta.json`:
```json
{
  "service": "docling",
  "displayName": "Docling",
  "description": "Document processing and parsing for diverse formats",
  "website": "https://docling-project.github.io/docling/",
  "icon": "docling",
  "category": "documentation"
}
```

`src/modules/mcps/data/mcps/docling/official.json`:
```json
{
  "$schema": "../_schema.json",
  "id": "docling",
  "name": "Docling",
  "description": "Document processing and parsing for diverse formats (PDF, DOCX, PPTX, HTML, etc.)",
  "category": "documentation",
  "icon": "docling",
  "logoUrl": "https://docling-project.github.io/docling/assets/logo.png",
  "source": "official",
  "maintainer": {
    "name": "Docling Project",
    "url": "https://docling-project.github.io/docling/",
    "github": "docling-project"
  },
  "status": "active",
  "version": "latest",
  "transport": "stdio",
  "inputs": {},
  "configuration": {
    "template": {
      "command": "uvx",
      "args": ["--from=docling-mcp", "docling-mcp-server"],
      "env": {}
    }
  },
  "metadata": {
    "homepage": "https://docling-project.github.io/docling/usage/mcp/",
    "repository": "https://github.com/docling-project/docling",
    "addedAt": "2025-12-13",
    "lastUpdated": "2025-12-13"
  }
}
```

### Example 3: STDIO MCP with Credentials

**MCP with API Key** - User must provide credentials:

```json
{
  "$schema": "../_schema.json",
  "id": "example-api",
  "name": "Example API",
  "description": "Access Example service via MCP",
  "category": "development",
  "icon": "example",
  "source": "official",
  "maintainer": {
    "name": "Example Inc",
    "github": "example"
  },
  "status": "active",
  "version": "latest",
  "transport": "stdio",
  "inputs": {
    "API_KEY": {
      "label": "API Key",
      "required": true,
      "type": "password",
      "description": "Your Example API key from https://example.com/settings"
    }
  },
  "configuration": {
    "template": {
      "command": "npx",
      "args": ["-y", "@example/mcp@latest"],
      "env": {
        "EXAMPLE_API_KEY": "${API_KEY}"
      }
    }
  },
  "metadata": {
    "homepage": "https://docs.example.com/mcp",
    "repository": "https://github.com/example/mcp",
    "addedAt": "2025-01-01",
    "lastUpdated": "2025-01-01"
  }
}
```

### Example 4: Streamable HTTP MCP with API Key

**Remote MCP Server** - HTTP-based transport with token authentication:

```json
{
  "$schema": "../_schema.json",
  "id": "supabase",
  "name": "Supabase",
  "description": "Execute SQL queries, manage database schema, and interact with Supabase projects",
  "category": "database",
  "icon": "database",
  "logoUrl": "https://cdn.brandfetch.io/idsSceG8fK/w/436/h/449/theme/dark/symbol.png",
  "source": "official",
  "maintainer": {
    "name": "Supabase",
    "url": "https://supabase.com",
    "github": "supabase"
  },
  "status": "active",
  "version": "1.0.0",
  "transport": "streamable-http",
  "auth": {
    "type": "api-key"
  },
  "inputs": {
    "SUPABASE_ACCESS_TOKEN": {
      "label": "Supabase Access Token",
      "required": true,
      "type": "password",
      "description": "Personal access token from supabase.com/dashboard/account/tokens"
    },
    "SUPABASE_PROJECT_REF": {
      "label": "Project Reference",
      "required": false,
      "type": "string",
      "description": "Scope access to a specific project (optional)"
    }
  },
  "configuration": {
    "template": {
      "type": "streamable-http",
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  },
  "metadata": {
    "homepage": "https://supabase.com/docs/guides/getting-started/mcp",
    "addedAt": "2025-01-01",
    "lastUpdated": "2025-01-01"
  }
}
```

### Example 5: Streamable HTTP MCP with OAuth

**Remote MCP with OAuth** - Authentication handled automatically via browser flow:

```json
{
  "$schema": "../_schema.json",
  "id": "linear",
  "name": "Linear",
  "description": "Find, create, and update issues, projects, and comments in Linear",
  "category": "productivity",
  "icon": "linear",
  "logoUrl": "https://linear.app/static/apple-touch-icon.png",
  "source": "official",
  "maintainer": {
    "name": "Linear",
    "url": "https://linear.app",
    "github": "linear"
  },
  "status": "active",
  "version": "latest",
  "transport": "streamable-http",
  "auth": {
    "type": "oauth",
    "note": "Uses OAuth 2.1 with browser-based login. Tokens are stored locally on your machine and never shared with third parties."
  },
  "inputs": {},
  "configuration": {
    "template": {
      "type": "streamable-http",
      "url": "https://mcp.linear.app/mcp"
    }
  },
  "metadata": {
    "homepage": "https://linear.app/docs/mcp",
    "addedAt": "2025-01-01",
    "lastUpdated": "2025-01-01"
  }
}
```

**Important:** For OAuth MCPs, the `note` field should reassure users that authentication is local and secure.

## Field Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `$schema` | string | Always `"../_schema.json"` |
| `id` | string | Unique ID: lowercase, alphanumeric, hyphens only |
| `name` | string | Display name (capitalized) |
| `description` | string | What the MCP does |
| `category` | enum | See [Categories](#categories) section below |
| `source` | enum | `official` (by provider) or `community` (third-party) |
| `transport` | enum | `stdio`, `sse`, or `streamable-http` |
| `configuration` | object | How to run/connect to the MCP |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `icon` | string | Icon name (usually same as service) |
| `logoUrl` | URL | Logo image URL |
| `maintainer` | object | `{ name, url?, github? }` |
| `status` | enum | `active`, `deprecated`, `experimental` |
| `version` | string | Version or `"latest"` |
| `auth` | object | Authentication info `{ type, note? }` - see [Authentication](#authentication) |
| `inputs` | object | User credentials/config needed |
| `metadata` | object | `{ homepage?, repository?, addedAt?, lastUpdated? }` |

### Categories

Valid categories are defined in [`src/modules/mcps/data/mcps/_schema.json`](../src/modules/mcps/data/mcps/_schema.json).

| Category | Use for |
|----------|---------|
| `documentation` | Docs, knowledge bases, reference materials |
| `development` | Dev tools, CI/CD, cloud platforms, APIs |
| `database` | Databases, data storage, query tools |
| `automation` | Browser automation, workflows, scripts |
| `ai` | AI/ML services, model providers |
| `communication` | Chat, email, notifications |
| `productivity` | Notes, calendars, task management |
| `mcp-ui` | MCPs with visual UI components |
| `other` | Doesn't fit other categories |

**How to choose:**

1. Check existing MCPs in similar services for consistency
2. Pick the **primary purpose** - if an MCP does multiple things, choose what it mainly does
3. Use `development` for general cloud/platform tools (AWS, Cloudflare, Vercel)
4. Use `other` only as last resort
5. **Don't create new categories** - if none fit well, open an issue to discuss

### Configuration Templates

**STDIO (command-line):**
```json
{
  "template": {
    "command": "npx",
    "args": ["-y", "@package/mcp@latest"],
    "env": {}
  }
}
```

**HTTP/SSE (remote server):**
```json
{
  "template": {
    "type": "streamable-http",
    "url": "https://api.example.com/mcp",
    "headers": {
      "Authorization": "Bearer ${TOKEN}"
    }
  }
}
```

### Input Types

```json
{
  "inputs": {
    "API_KEY": {
      "label": "API Key",
      "required": true,
      "type": "password",
      "description": "Get it from https://..."
    },
    "WORKSPACE": {
      "label": "Workspace ID",
      "required": false,
      "type": "string",
      "default": "default",
      "description": "Optional workspace"
    }
  }
}
```

Types: `string`, `password`, `number`, `boolean`

### Authentication

The `auth` field describes how the MCP handles authentication. This helps users understand what to expect when connecting.

| Type | When to use |
|------|-------------|
| `oauth` | MCP uses OAuth flow (browser login). User authorizes via their browser. |
| `api-key` | User provides an API key or token manually via `inputs`. |
| `none` | No authentication required. |

**OAuth Security Note:**

For MCPs using OAuth, include a `note` explaining that authentication is secure and local:

```json
"auth": {
  "type": "oauth",
  "note": "Uses OAuth 2.1 with browser-based login. Tokens are stored locally on your machine and never shared with third parties."
}
```

This reassures users that:
- They authenticate directly with the service (e.g., Linear, GitHub)
- Tokens are stored **locally** on their machine
- No credentials are sent to third-party servers
- Only their local MCP client accesses the service

## Naming Conventions

### Display Names

Since MCPs are grouped by service, **don't repeat the service name** in the `name` field:

| Service | Bad | Good |
|---------|-----|------|
| cloudflare | "Cloudflare Workers" | "Workers" |
| cloudflare | "Cloudflare AI Gateway" | "AI Gateway" |
| supabase | "Supabase Database" | "Database" |

Exception: If the service only has one MCP, using the service name is fine (e.g., "Supabase", "Playwright").

### File Names and IDs

| Source | File Name | ID Pattern |
|--------|-----------|------------|
| Official | `official.json` | `[service]` |
| Official variant | `official-[variant].json` | `[service]-[variant]` |
| Community | `community-[name].json` | `[service]-[name]-community` |

## Validation

```bash
# Validate schema
npm run validate-mcps

# List all MCPs
npm run list-mcps

# Check your MCP appears
npm run list-mcps -- --json | jq '.[] | select(.id == "your-mcp-id")'
```

## Testing with MCP Inspector

```bash
# Test STDIO MCPs
npx @modelcontextprotocol/inspector@latest --cli npx -y @your/mcp --method tools/list

# Test with env vars
npx @modelcontextprotocol/inspector@latest -e API_KEY=xxx --cli npx -y @your/mcp --method tools/list
```

## Checklist

- [ ] JSON passes `npm run validate-mcps`
- [ ] ID is unique (check with `npm run list-mcps`)
- [ ] No secrets/tokens in the file
- [ ] URLs are accessible
- [ ] Logo URL works (if provided)
- [ ] `_meta.json` exists for new services

## Supported Package Runners

CI supports all common package runners:

| Command | Runtime | Example |
|---------|---------|---------|
| `npx` | Node.js (npm) | `npx -y @scope/package@latest` |
| `pnpx` | Node.js (pnpm) | `pnpx @scope/package@latest` |
| `bunx` | Bun | `bunx @scope/package@latest` |
| `uvx` | Python (uv) | `uvx package-name` |
| `pipx` | Python | `pipx run package-name` |
| `docker` | Docker | `docker run --rm -i image:tag` |

## Common Patterns

### NPX (Node.js/npm)
```json
"command": "npx",
"args": ["-y", "@scope/package@latest"]
```

### PNPX (Node.js/pnpm)
```json
"command": "pnpx",
"args": ["@scope/package@latest"]
```

### Bunx (Bun)
```json
"command": "bunx",
"args": ["@scope/package@latest"]
```

### UVX (Python/uv)
```json
"command": "uvx",
"args": ["package-name"]
```

### UVX with --from (different package/command names)
```json
"command": "uvx",
"args": ["--from=package-name", "command-name"]
```

### Pipx (Python)
```json
"command": "pipx",
"args": ["run", "package-name"]
```

### Docker
```json
"command": "docker",
"args": ["run", "--rm", "-i", "image:tag"]
```
