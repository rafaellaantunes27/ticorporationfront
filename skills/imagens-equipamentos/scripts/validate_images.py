#!/usr/bin/env python3
"""Validação determinística local. Não acessa API e não escreve no Supabase."""
import hashlib
import json
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[4]

def validate_records(records, approved, prepared_dir, strict_seed=True):
    expected=[f'TI-{i:04d}' for i in range(1,13)]
    if strict_seed and (len(records)!=12 or [r['assetTag'] for r in records]!=expected):
        raise ValueError('DATA-CA-01: lista de 12 patrimônios fora do padrão canônico.')
    photo_map = {entry['assetTag']: entry for entry in approved}
    if len(photo_map) != len(approved) or len(approved) != len(records):
        raise ValueError('São necessárias 12 aprovações únicas para 12 equipamentos.')
    ids, shas, result = set(), set(), []
    for entry in records:
        asset = entry['assetTag']
        photo = photo_map.get(asset)
        if not photo or not photo.get('visuallyApproved') or not photo.get('reviewedBy'):
            raise ValueError(f'IMG-CA-02: pendência de aprovação humana: {asset}')
        if not photo.get('pixabayId') or not photo.get('photographer') or not photo.get('pageURL', '').startswith('https://pixabay.com/'):
            raise ValueError(f'IMG-CA-05: crédito incompleto: {asset}')
        source = prepared_dir / f'{asset}.jpg'
        if not source.is_file():
            raise ValueError(f'IMG-CA-03: foto processada ausente: {asset}')
        with Image.open(source) as image:
            if image.size != (800, 600) or image.format != 'JPEG' or image.mode != 'RGB':
                raise ValueError(f'IMG-CA-03: foto não é JPEG RGB em 800x600: {asset}')
        checksum = hashlib.sha256(source.read_bytes()).hexdigest()
        if photo['pixabayId'] in ids or checksum in shas:
            raise ValueError(f'IMG-CA-04: foto duplicada: {asset}')
        ids.add(photo['pixabayId'])
        shas.add(checksum)
        result.append({**entry, 'pixabayId': photo['pixabayId'], 'photographer': photo['photographer'],
                       'sourceURL': photo['pageURL'], 'license': 'Pixabay Content License',
                       'imageFile': f'data/prepared-images/{asset}.jpg', 'sha256': checksum})
    return result

if __name__ == '__main__':
    records = json.loads((ROOT/'data/equipment.seed.json').read_text(encoding='utf8'))
    approved = json.loads((ROOT/'data/approved-photos.json').read_text(encoding='utf8'))
    try:
        manifest = validate_records(records, approved, ROOT/'data/prepared-images')
    except ValueError as err:
        raise SystemExit(str(err))
    dest = ROOT/'data/ready-images.json'
    dest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print('Validado: 12 fotos 800×600, autores e URLs com licença, sem ID ou conteúdo duplicado.')
