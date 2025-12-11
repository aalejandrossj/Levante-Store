export type TransportType = 'stdio' | 'http' | 'sse';

export interface EnvVarDefinition {
  label: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean';
  default?: string;
  description?: string;
}

export interface MCPServerDescriptor {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  logoUrl?: string; // ✅ URL de logo (campo directo compatible con Levante)
  transport: TransportType;
  command: string;
  args: string[];
  env: Record<string, EnvVarDefinition>;
  metadata?: {
    homepage?: string;
    author?: string;
    repository?: string;
    useCount?: number;
  };
}

export interface MCPStoreResponse {
  version: string;
  provider: {
    id: string;
    name: string;
    homepage?: string;
  };
  servers: MCPServerDescriptor[];
}
