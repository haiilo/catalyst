import { replaceInFileSync } from 'replace-in-file';
// --- Replace '~' imports

const results = replaceInFileSync({
  files: 'dist/catalyst/scss/**/*.scss',
  from: /@(import|use|forward) '~/g,
  to: "@$1 '"
});

const output = results
  .filter(result => result.hasChanged)
  .map(result => `  - ${result.file}`)
  .join('\n');

if (output.length) {
  console.info('\x1b[32m%s\x1b[0m', `Replaced SCSS '~' imports in\n${output}`);
} else {
  console.info('\x1b[32m%s\x1b[0m', 'No SCSS imports replaced.');
}

// --- Patch boolean value accessor

const results2 = replaceInFileSync({
  files: '../angular/projects/catalyst/src/lib/directives/boolean-value-accessor.ts',
  from: 'this.el.nativeElement.checked = this.lastValue = value == null ? false : value;',
  to: 'this.el.nativeElement.checked = this.lastValue = this.el.nativeElement.value == null ? value : this.el.nativeElement.value === value;'
});

if (results2.filter(result => result.hasChanged).length) {
  console.info('\x1b[32m%s\x1b[0m', `Patched boolean-value-accessor.ts`);
}
