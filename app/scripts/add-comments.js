const fs = require('fs');
const path = require('path');
const root = path.resolve('.');
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') return [];
      return walk(fullPath);
    }
    if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      return [fullPath];
    }
    return [];
  });
}
function describeFromPath(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  if (rel.endsWith('middleware.ts')) {
    return 'Next.js middleware that validates auth state and redirects users based on onboarding and route rules.';
  }
  const parts = rel.split('/');
  const fileName = parts[parts.length - 1].replace(/\.(ts|tsx)$/, '');
  if (parts.includes('api')) return `API definitions for ${fileName} in the ${parts.join(' > ')} area.`;
  if (parts.includes('hooks')) return `Reusable hook definitions for ${fileName}.`;
  if (parts.includes('ui')) return `UI component definitions for ${fileName}.`;
  if (parts.includes('lib')) return `Library helper code or utilities for ${fileName}.`;
  if (parts.includes('model')) return `State or model logic for ${fileName}.`;
  if (parts.includes('types')) return `Type declarations for ${fileName}.`;
  if (parts.includes('tests')) return `Tests for ${fileName}.`;
  if (parts.includes('providers')) return `Provider logic for ${fileName}.`;
  if (parts.includes('features')) return `Feature code for ${fileName}.`;
  return `Implementation for ${fileName}.`;
}
function hasUseClient(lines) {
  return lines.some((line) => line.trim() === '"use client";' || line.trim() === "'use client';");
}
function isServerComponent(filePath, lines) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  return rel.startsWith('src/app/') && filePath.endsWith('.tsx') && !hasUseClient(lines);
}
function descriptionForDeclaration(declName, filePath, trimmedLine) {
  if (!declName) return null;
  const lower = declName.toLowerCase();

  if (declName === 'k') return 'Scale factor used to adjust avatar image position and size based on the rendered component dimensions.';
  if (declName === 'PosAvatar') return 'React component that renders an avatar crop area using transform and clipping.';
  if (declName === 'Props') return 'Type describing component props.';
  if (declName.endsWith('Props')) return `Props type for the ${declName.slice(0, -5)} component.`;
  if (declName.endsWith('State')) return `Shape of the ${declName.slice(0, -5)} state.`;
  if (declName.startsWith('use')) return `Custom hook that manages ${declName.slice(3)} logic.`;
  if (declName.endsWith('Provider')) return `Provider that supplies ${declName.slice(0, -8)} context or state.`;
  if (declName.endsWith('Slice')) return `Redux slice that manages ${declName.slice(0, -5)} state.`;
  if (declName.endsWith('API')) return `API helper for ${declName.slice(0, -3)} operations.`;
  if (declName.endsWith('Form')) return `Form component that captures ${declName.slice(0, -4).replace(/([A-Z])/g, ' $1').trim().toLowerCase()} input.`;
  if (declName.endsWith('Button') || declName.endsWith('Btn')) return `Button component for a user action in ${path.relative(root, filePath)}.`;
  if (declName.endsWith('Menu')) return `Menu component or interaction handler.`;
  if (declName.endsWith('Page')) return `Page component for the ${declName.slice(0, -4)} view.`;
  if (declName === 'middleware') return 'Middleware function that inspects requests and applies redirects or headers.';
  if (declName === 'config') return 'Configuration object used by middleware or routing.';
  if (lower.startsWith('validate')) return `Validation helper that checks whether ${declName.slice(8).toLowerCase()} input is valid.`;
  if (lower.startsWith('get')) return `Helper that returns computed data for ${declName.slice(3).toLowerCase()}.`;
  if (lower.startsWith('set')) return `Helper that updates values or state for ${declName.slice(3).toLowerCase()}.`;
  if (lower.startsWith('is')) return `Boolean helper that checks whether ${declName.slice(2).toLowerCase()} is true.`;
  if (lower.startsWith('fetch') || lower.startsWith('load')) return `Function that loads data for ${lower.slice(lower.startsWith('fetch') ? 5 : 4)}.`;
  if (declName.startsWith('create')) return `Factory helper that creates ${declName.slice(6).toLowerCase()} objects or state.`;
  if (declName.startsWith('make')) return `Utility that builds or initializes ${declName.slice(4).toLowerCase()} values.`;
  if (declName === 'Startpage') return 'Server-rendered page component for the start page.';
  if (declName === 'RootLayout') return 'Root layout component that wraps every page and reads server cookies/headers.';
  if (declName === 'verifyAuth') return 'Async function that validates the auth token by calling the backend.';
  return null;
}
function commentForLine(trimmed) {
  if (trimmed.startsWith('// File:') || trimmed.startsWith('// Description:') || trimmed.startsWith('// Client component') || trimmed.startsWith('// Server component') || trimmed.startsWith('// Computed value or helper used inside') || trimmed.startsWith('// Exported symbol') || trimmed.startsWith('// React ')) {
    return null;
  }
  const reactState = trimmed.match(/^(const|let|var)\s+\[([A-Za-z0-9_]+),\s*set([A-Z][A-Za-z0-9_]*)\]\s*=\s*useState\(/);
  if (reactState) {
    return `// React state storing ${reactState[2]} values and updating them with ${reactState[3]}.`;
  }
  if (/^(const|let|var)\s+[A-Za-z0-9_]+\s*=\s*useRef\(/.test(trimmed)) {
    return `// React ref storing a DOM element reference between renders.`;
  }
  if (/^(const|let|var)\s+[A-Za-z0-9_]+\s*=\s*useMemo\(/.test(trimmed)) {
    return `// Memoized value computed from dependencies to optimize rendering.`;
  }
  if (/^(const|let|var)\s+[A-Za-z0-9_]+\s*=\s*useCallback\(/.test(trimmed)) {
    return `// Memoized callback to avoid recreating the handler each render.`;
  }
  if (/\bawait\s+fetch\(/.test(trimmed) || /^const\s+[A-Za-z0-9_]+\s*=\s*fetch\(/.test(trimmed)) {
    return `// Perform an HTTP request to the backend API and wait for the response.`;
  }
  if (trimmed.includes('cookies().get(')) {
    return `// Read a cookie from the incoming request in server-side rendering.`;
  }
  if (trimmed.includes('headers()')) {
    return `// Read request headers on the server to access middleware-provided data.`;
  }
  if (trimmed.includes('headersList.get(')) {
    return `// Extract a custom header value passed through middleware.`;
  }
  if (trimmed.startsWith('if (!token)')) {
    return `// Do not call the backend when the auth token is missing.`;
  }
  if (trimmed.startsWith('return undefined')) {
    return `// Return undefined for invalid or missing input.`;
  }
  if (trimmed.startsWith('return { data:')) {
    return `// Return a typed response payload with either data or error.`;
  }
  if (/const\s+k\s*=/.test(trimmed)) {
    return `// Calculate a numeric scale factor used in avatar image translation.`;
  }
  if (/const\s+imgWidth\s*=/.test(trimmed)) {
    return `// Compute the current image width after scaling.`;
  }
  if (/const\s+imgHeight\s*=/.test(trimmed)) {
    return `// Compute the current image height after scaling.`;
  }
  if (/const\s+min(X|Y)\s*=/.test(trimmed)) {
    return `// Compute the minimum translation bound so the image stays inside the frame.`;
  }
  if (/const\s+[xy]\s*=\s*Math\.min\(/.test(trimmed)) {
    return `// Clamp dragged coordinates so the image cannot move outside the container.`;
  }
  if (trimmed.startsWith('return (')) {
    return `// Render the component's JSX structure.`;
  }
  if (trimmed.startsWith('type Props =')) {
    return `// Props type used to type-check component inputs.`;
  }
  if (trimmed.startsWith('export type')) {
    return `// Exported type alias used for typing shared data shapes.`;
  }
  return null;
}
function getFileVariantComments(filePath, lines) {
  const result = [];
  if (hasUseClient(lines)) {
    result.push('// Client component: this file runs in the browser and can use hooks and DOM APIs.');
  } else if (isServerComponent(filePath, lines)) {
    result.push('// Server component (SSR): this Next.js file is rendered on the server.');
  }
  return result;
}
const files = walk(root);
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const firstNonEmpty = lines.findIndex((line) => line.trim().length > 0);
  const newLines = [];
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (firstNonEmpty >= 0 && !lines[firstNonEmpty].startsWith('// File:')) {
    const header = [
      `// File: ${rel}`,
      `// Description: ${describeFromPath(file)}`,
      '',
    ];
    newLines.push(...header);
    const variants = getFileVariantComments(file, lines);
    if (variants.length) {
      newLines.push(...variants, '');
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const prev = newLines.length > 0 ? newLines[newLines.length - 1].trim() : '';
    if (
      trimmed.startsWith('// Computed value or helper used inside') ||
      trimmed.startsWith('// Exported symbol') ||
      trimmed.startsWith('// File:') ||
      trimmed.startsWith('// Description:')
    ) {
      continue;
    }
    const declMatch = trimmed.match(/^(export\s+)?(const|function|class|type|interface|enum)\s+([A-Za-z0-9_]+)/);
    const defaultMatch = trimmed.match(/^export\s+default\s+([A-Za-z0-9_]+)/);
    const namedMatch = trimmed.match(/^(const|function|class)\s+([A-Za-z0-9_]+)/);
    let declName = null;
    if (declMatch) declName = declMatch[3];
    else if (defaultMatch) declName = defaultMatch[1];
    else if (namedMatch && trimmed.startsWith('const') && trimmed.includes('=')) declName = namedMatch[2];
    const isDefaultExportStatement = trimmed.startsWith('export default ') && !trimmed.includes('function') && !trimmed.includes('class');
    if (isDefaultExportStatement && prev.startsWith('//')) {
      newLines.pop();
    }
    if (
      declName &&
      !trimmed.startsWith('import') &&
      !trimmed.startsWith('export type') &&
      !trimmed.startsWith('export interface') &&
      !trimmed.startsWith('export enum')
    ) {
      const description = descriptionForDeclaration(declName, file, trimmed);
      if (description) {
        const currentPrev = newLines.length > 0 ? newLines[newLines.length - 1].trim() : '';
        if (!currentPrev.startsWith('//')) {
          newLines.push(`// ${description}`);
        }
      }
    }
    const inlineComment = commentForLine(trimmed);
    if (inlineComment) {
      const currentPrev = newLines.length > 0 ? newLines[newLines.length - 1].trim() : '';
      if (!currentPrev.startsWith('//')) {
        newLines.push(inlineComment);
      }
    }
    newLines.push(line);
  }
  const output = newLines.join('\n');
  if (output !== text) {
    fs.writeFileSync(file, output, 'utf8');
  }
}
console.log(`Annotated ${files.length} files.`);
