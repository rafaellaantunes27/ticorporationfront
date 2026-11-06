#!/usr/bin/env python3
"""Normaliza UMA foto previamente aprovada pelo humano, sem operações remotas de escrita."""
import argparse, hashlib, io, json, pathlib, urllib.parse, urllib.request
from PIL import Image, ImageOps, UnidentifiedImageError
ROOT=pathlib.Path(__file__).resolve().parents[4]
APPROVED=ROOT/'data/approved-photos.json'; OUT=ROOT/'data/prepared-images'

def normalize(payload:bytes)->bytes:
    if len(payload)>15_000_000: raise ValueError('Imagem excede 15 MB')
    with Image.open(io.BytesIO(payload)) as im:
        if im.width<800 or im.height<600: raise ValueError('Imagem não possui resolução suficiente')
        if im.width*im.height>45_000_000: raise ValueError('Imagem grande demais')
        img=ImageOps.fit(im.convert('RGB'),(800,600),method=Image.Resampling.LANCZOS,centering=(0.5,0.5))
        buf=io.BytesIO();img.save(buf,format='JPEG',quality=88,optimize=True)
        img.close()
    out=buf.getvalue()
    with Image.open(io.BytesIO(out)) as verification:
        if verification.size!=(800,600) or verification.format!='JPEG':raise ValueError('Dimensões finais inválidas')
    return out

def prepare(asset):
    approved=json.loads(APPROVED.read_text(encoding='utf8'))
    entry=next((x for x in approved if x.get('assetTag')==asset),None)
    if not entry or entry.get('visuallyApproved') is not True or not entry.get('reviewedBy'):
        raise ValueError('Revisão visual por pessoa identificada é obrigatória antes de baixar.')
    if not entry.get('pixabayId') or not entry.get('pageURL','').startswith('https://pixabay.com/') or not entry.get('photographer'):
        raise ValueError('Metadados de origem e crédito ausentes.')
    url=entry.get('downloadURL','')
    parsed=urllib.parse.urlparse(url)
    if parsed.scheme!='https' or parsed.hostname not in ('pixabay.com','cdn.pixabay.com'):
        raise ValueError('O download precisa vir de host Pixabay em HTTPS.')
    if any(x.get('pixabayId')==entry['pixabayId'] and x.get('assetTag')!=asset for x in approved):
        raise ValueError('Mesmo ID Pixabay selecionado para dois equipamentos.')
    req=urllib.request.Request(url,headers={'User-Agent':'EMPREST.AI Image Review/1.0'})
    with urllib.request.urlopen(req,timeout=35) as res:
        destination=urllib.parse.urlparse(res.geturl())
        if destination.scheme!='https' or destination.hostname not in ('pixabay.com','cdn.pixabay.com'):
            raise ValueError('Redirecionamento saiu do domínio Pixabay.')
        image_bytes=res.read(15_000_001)
    contents=normalize(image_bytes)
    sha=hashlib.sha256(contents).hexdigest()
    OUT.mkdir(parents=True,exist_ok=True)
    for other in OUT.glob('TI-*.jpg'):
        if other.name != f'{asset}.jpg' and hashlib.sha256(other.read_bytes()).hexdigest()==sha:
            raise ValueError('Conteúdo de foto duplicado detectado')
    (OUT/f'{asset}.jpg').write_bytes(contents)
    print(json.dumps({'assetTag':asset,'width':800,'height':600,'sha256':sha,'path':str(OUT/f'{asset}.jpg')},ensure_ascii=False))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--asset',required=True);prepare(p.parse_args().asset)
