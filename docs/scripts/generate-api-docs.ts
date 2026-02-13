import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Types matching Stencil's docs.json structure
interface Prop {
  name: string;
  type: string;
  attr?: string;
  docs: string;
  default?: string;
  required: boolean;
}

interface Method {
  name: string;
  signature: string;
  docs: string;
}

interface Event {
  event: string;
  detail: string;
  docs: string;
}

interface Slot {
  name: string;
  docs: string;
}

interface Part {
  name: string;
  docs: string;
}

interface ComponentDocs {
  tag: string;
  docs: string;
  props: Prop[];
  methods: Method[];
  events: Event[];
  slots: Slot[];
  parts: Part[];
  dependents: string[];
  dependencies: string[];
}

const CORE_COMPONENTS_DIR = join(process.cwd(), '../core/src/components');
const OUTPUT_DIR = join(process.cwd(), 'generated-api');

function escapeTableCell(text: string): string {
  if (!text) return '';
  return text
    .replace(/<br\s*\/?>/gi, ' ') // Replace <br> tags with space
    .replace(/<[^>]+>/g, '') // Remove any other HTML tags
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

function formatType(type: string): string {
  // Escape pipe characters for markdown tables
  return type.replace(/\|/g, ' \\| ');
}

function generatePropsTable(props: Prop[]): string {
  if (!props || !props.length) return '';

  const rows = props.map((p) => {
    const name = `\`${p.name}\``;
    const attr = p.attr ? `\`${p.attr}\`` : '-';
    const type = `\`${formatType(p.type)}\``;
    const defaultVal = p.default ? `\`${p.default}\`` : '-';
    const docs = escapeTableCell(p.docs);
    return `| ${name} | ${attr} | ${type} | ${defaultVal} | ${docs} |`;
  });

  return `### Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
${rows.join('\n')}`;
}

function generateEventsTable(events: Event[]): string {
  if (!events || !events.length) return '';

  const rows = events.map((e) => {
    const event = `\`${e.event}\``;
    const detail = `\`${e.detail}\``;
    const docs = escapeTableCell(e.docs);
    return `| ${event} | ${detail} | ${docs} |`;
  });

  return `### Events

| Event | Detail | Description |
|-------|--------|-------------|
${rows.join('\n')}`;
}

function generateMethodsTable(methods: Method[]): string {
  if (!methods || !methods.length) return '';

  const rows = methods.map((m) => {
    const name = `\`${m.name}\``;
    const signature = `\`${escapeTableCell(m.signature)}\``;
    const docs = escapeTableCell(m.docs);
    return `| ${name} | ${signature} | ${docs} |`;
  });

  return `### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
${rows.join('\n')}`;
}

function generateSlotsTable(slots: Slot[]): string {
  if (!slots || !slots.length) return '';

  const rows = slots.map((s) => {
    const name = s.name ? `\`${s.name}\`` : '(default)';
    const docs = escapeTableCell(s.docs);
    return `| ${name} | ${docs} |`;
  });

  return `### Slots

| Slot | Description |
|------|-------------|
${rows.join('\n')}`;
}

function generatePartsTable(parts: Part[]): string {
  if (!parts || !parts.length) return '';

  const rows = parts.map((p) => {
    const name = `\`${p.name}\``;
    const docs = escapeTableCell(p.docs);
    return `| ${name} | ${docs} |`;
  });

  return `### Shadow Parts

| Part | Description |
|------|-------------|
${rows.join('\n')}`;
}

function generateDependencies(docs: ComponentDocs): string {
  const sections: string[] = [];

  if (docs.dependents && docs.dependents.length) {
    const links = docs.dependents.map((d) => `\`${d}\``).join(', ');
    sections.push(`**Used by:** ${links}`);
  }
  if (docs.dependencies && docs.dependencies.length) {
    const links = docs.dependencies.map((d) => `\`${d}\``).join(', ');
    sections.push(`**Depends on:** ${links}`);
  }

  return sections.length ? `### Dependencies\n\n${sections.join('\n\n')}` : '';
}

function generateApiMarkdown(docs: ComponentDocs): string {
  const sections = [
    generatePropsTable(docs.props),
    generateEventsTable(docs.events),
    generateMethodsTable(docs.methods),
    generateSlotsTable(docs.slots),
    generatePartsTable(docs.parts),
    generateDependencies(docs),
  ].filter(Boolean);

  return sections.join('\n\n');
}

function getComponentName(tag: string): string {
  // Remove 'cat-' prefix for the filename
  return tag.replace(/^cat-/, '');
}

// Main execution
console.log('Generating API documentation...\n');

// Create output directory
mkdirSync(OUTPUT_DIR, { recursive: true });

// Get all component directories
const componentDirs = readdirSync(CORE_COMPONENTS_DIR).filter((dir) => {
  const fullPath = join(CORE_COMPONENTS_DIR, dir);
  return statSync(fullPath).isDirectory() && dir.startsWith('cat-');
});

let generated = 0;
let skipped = 0;

for (const dir of componentDirs) {
  const docsPath = join(CORE_COMPONENTS_DIR, dir, 'docs.json');

  try {
    const docsContent = readFileSync(docsPath, 'utf-8');
    const docs: ComponentDocs = JSON.parse(docsContent);
    const markdown = generateApiMarkdown(docs);

    if (markdown.trim()) {
      const componentName = getComponentName(docs.tag);
const outputPath = join(OUTPUT_DIR, `${componentName}.md`);
    writeFileSync(outputPath, markdown);
    console.log(`  ✓ ${docs.tag} -> generated-api/${componentName}.md`);
      generated++;
    } else {
      console.log(`  ⊘ ${dir} (no API to document)`);
      skipped++;
    }
  } catch (error) {
    // Skip directories without docs.json
    console.log(`  ⊘ ${dir} (no docs.json)`);
    skipped++;
  }
}

console.log(`\nDone! Generated ${generated} files, skipped ${skipped}.`);
