import { readFileSync } from 'fs';
import { join } from 'path';
import { CopyableValue } from './copy-button';

interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 32,
        height: 32,
        background: color,
        border: '1px solid #d7dbe0',
        borderRadius: 4,
        verticalAlign: 'middle',
      }}
      title={color}
    />
  );
}

// Token types
interface Token {
  $type: string;
  $value: string | number;
}

interface TokenGroup {
  [key: string]: Token | TokenGroup;
}

function isToken(obj: unknown): obj is Token {
  return typeof obj === 'object' && obj !== null && '$type' in obj && '$value' in obj;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!result) return '';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = result[4] ? parseInt(result[4], 16) / 255 : undefined;
  if (a !== undefined && a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

interface FlatToken {
  path: string;
  hex: string;
  rgb: string;
}

function flattenTokens(obj: TokenGroup, prefix: string = ''): FlatToken[] {
  const result: FlatToken[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isToken(value)) {
      const hex = String(value.$value);
      result.push({ path, hex, rgb: hexToRgb(hex) });
    } else if (typeof value === 'object' && value !== null) {
      result.push(...flattenTokens(value as TokenGroup, path));
    }
  }
  return result;
}

function formatCategoryName(name: string): string {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
}

function getTokenData(category: 'base' | 'ui' | 'theme') {
  const tokensPath = join(process.cwd(), '../tokens/dist/export/figma.json');
  const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8')) as TokenGroup;
  const colorTokens = (tokens.color as TokenGroup)[category] as TokenGroup;
  const flatTokens = flattenTokens(colorTokens, `color.${category}`);

  const groups = new Map<string, FlatToken[]>();
  for (const token of flatTokens) {
    const parts = token.path.split('.');
    const group = parts[2] || 'other';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(token);
  }
  return groups;
}

interface ColorTokenTableProps {
  category: 'base' | 'ui' | 'theme';
}

// Original table style (kept for backward compatibility)
export function ColorTokenTable({ category }: ColorTokenTableProps) {
  const groups = getTokenData(category);

  return (
    <div>
      {Array.from(groups.entries()).map(([groupName, groupTokens]) => (
        <div key={groupName} style={{ marginBottom: '2rem' }}>
          <h3>{formatCategoryName(groupName)}</h3>
          <table>
            <thead>
              <tr>
                <th>Preview</th>
                <th>Token</th>
                <th>Hex</th>
                <th>RGB</th>
              </tr>
            </thead>
            <tbody>
              {groupTokens.map((token) => (
                <tr key={token.path}>
                  <td><ColorSwatch color={token.hex} /></td>
                  <td><CopyableValue value={token.path}><code>{token.path}</code></CopyableValue></td>
                  <td><CopyableValue value={token.hex}><code>{token.hex}</code></CopyableValue></td>
                  <td><CopyableValue value={token.rgb}><code>{token.rgb}</code></CopyableValue></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// Style A: List Rows - Full-width rows with swatch on left edge
export function ColorTokenListRows({ category }: ColorTokenTableProps) {
  const groups = getTokenData(category);
  const borderColor = '#e5e7eb';

  return (
    <div>
      {Array.from(groups.entries()).map(([groupName, groupTokens]) => (
        <div key={groupName} style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
            {formatCategoryName(groupName)}
          </h3>
          <div style={{ 
            borderRadius: 8,
            overflow: 'hidden',
            border: `1px solid ${borderColor}`,
          }}>
            {groupTokens.map((token, index) => (
              <div
                key={token.path}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  borderBottom: index < groupTokens.length - 1 ? `1px solid ${borderColor}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 56,
                    minHeight: 56,
                    background: token.hex,
                    flexShrink: 0,
                  }}
                  title={token.hex}
                />
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    gap: '1rem',
                    minWidth: 0,
                  }}
                >
                  <CopyableValue value={token.path}>
                    <span style={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {token.path}
                    </span>
                  </CopyableValue>
                  <div style={{ 
                    display: 'flex', 
                    gap: '2rem',
                    color: '#6b7280',
                    fontSize: '0.8125rem',
                    fontFamily: 'ui-monospace, monospace',
                    flexShrink: 0,
                  }}>
                    <CopyableValue value={token.hex}><span style={{ width: '80px' }}>{token.hex}</span></CopyableValue>
                    <CopyableValue value={token.rgb} minWidth={140}><span style={{ width: '140px' }}>{token.rgb}</span></CopyableValue>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Style B: Cards - Grid of cards with large color preview
export function ColorTokenCards({ category }: ColorTokenTableProps) {
  const groups = getTokenData(category);
  const borderColor = '#e5e7eb';

  return (
    <div>
      {Array.from(groups.entries()).map(([groupName, groupTokens]) => (
        <div key={groupName} style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
            {formatCategoryName(groupName)}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}>
            {groupTokens.map((token) => (
              <div
                key={token.path}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div
                  style={{
                    height: 80,
                    background: token.hex,
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                  title={token.hex}
                />
                <div style={{ padding: '0.75rem' }}>
                  <CopyableValue value={token.path}>
                    <div style={{ 
                      fontWeight: 500, 
                      fontSize: '0.8125rem',
                      marginBottom: '0.5rem',
                      wordBreak: 'break-word',
                    }}>
                      {token.path}
                    </div>
                  </CopyableValue>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    <div><CopyableValue value={token.hex}>{token.hex}</CopyableValue></div>
                    <div><CopyableValue value={token.rgb}>{token.rgb}</CopyableValue></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Style C: Minimal Table - Clean table with larger swatches
export function ColorTokenMinimalTable({ category }: ColorTokenTableProps) {
  const groups = getTokenData(category);
  const borderColor = '#e5e7eb';

  return (
    <div>
      {Array.from(groups.entries()).map(([groupName, groupTokens]) => (
        <div key={groupName} style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
            {formatCategoryName(groupName)}
          </h3>
          <div style={{
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '56px 1fr 100px 160px',
              gap: '1rem',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              borderBottom: `1px solid ${borderColor}`,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6b7280',
            }}>
              <span>Preview</span>
              <span>Token</span>
              <span>Hex</span>
              <span>RGB</span>
            </div>
            {/* Rows */}
            {groupTokens.map((token, index) => (
              <div
                key={token.path}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr 100px 160px',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  alignItems: 'center',
                  borderBottom: index < groupTokens.length - 1 ? `1px solid ${borderColor}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: token.hex,
                    borderRadius: 6,
                    border: `1px solid ${borderColor}`,
                  }}
                  title={token.hex}
                />
                <CopyableValue value={token.path}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{token.path}</span>
                </CopyableValue>
                <CopyableValue value={token.hex}>
                  <span style={{ 
                    fontFamily: 'ui-monospace, monospace', 
                    fontSize: '0.8125rem',
                    color: '#6b7280',
                  }}>
                    {token.hex}
                  </span>
                </CopyableValue>
                <CopyableValue value={token.rgb}>
                  <span style={{ 
                    fontFamily: 'ui-monospace, monospace', 
                    fontSize: '0.8125rem',
                    color: '#6b7280',
                  }}>
                    {token.rgb}
                  </span>
                </CopyableValue>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
