"""Gera adaptação derivada de agents/verificador-spec.md para harnesses. Uso: python scripts/sync_agent_adapters.py [--check]."""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'agents/verificador-spec.md'


def generate():
    source = SOURCE.read_text(encoding='utf8').rstrip() + '\n'
    parts = source.split('---\n', 2)
    if len(parts) < 3 or not source.startswith('---\n'):
        raise ValueError('Frontmatter inválido')
    header = parts[1]
    body = parts[2].strip()
    desc = next(v.strip() for l in header.splitlines() if l.startswith('description:') for v in [l.partition(':')[2]])
    note = 'GERADO de agents/verificador-spec.md; não edite diretamente.'
    # The adapters are exact generated copies; YAML frontmatter MUST be first line.
    wrapper = source
    # TOML multilinha literal não pode conter três aspas simples.
    toml = 'name = "verificador-spec"\n' + 'description = ' + json.dumps(desc, ensure_ascii=False) + '\n' + 'developer_instructions = ' + json.dumps(body + '\n', ensure_ascii=False) + '\n'
    return {'.claude/agents/verificador-spec.md': wrapper, '.cursor/agents/verificador-spec.md': wrapper, '.codex/agents/verificador-spec.toml': toml}


def main():
    files = generate()
    checking = '--check' in sys.argv
    failed = []
    for name, content in files.items():
        path = ROOT / name
        if checking:
            if not path.exists() or path.read_text(encoding='utf8') != content:
                failed.append(name)
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding='utf8')
    if failed:
        print('Derivados desatualizados:', ', '.join(failed), file=sys.stderr)
        return 1
    print('Adaptadores dos subagentes:', 'sincronizados' if checking else 'gerados')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
