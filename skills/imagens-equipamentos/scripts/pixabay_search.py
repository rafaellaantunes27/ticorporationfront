#!/usr/bin/env python3
"""Busca HUMANA única na API Pixabay, com cache de 24 h. Sem API key no browser.
Usar: PIXABAY_API_KEY=... python scripts/pixabay_search.py --asset TI-0001
"""
import argparse, hashlib, json, os, pathlib, time, urllib.parse, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[4]
EQUIPMENT = json.loads((ROOT/'data/equipment.seed.json').read_text(encoding='utf8'))
CACHE = ROOT/'.cache/pixabay'

def search(asset):
    entry = next((x for x in EQUIPMENT if x['assetTag'] == asset), None)
    if not entry: raise ValueError('Patrimônio fora da lista oficial.')
    query = entry['search']; params = {'q':query,'image_type':'photo','orientation':'horizontal','safesearch':'true','min_width':'800','min_height':'600','per_page':'20'}
    cache_id = hashlib.sha256(json.dumps(params,sort_keys=True).encode()).hexdigest()
    file = CACHE/(cache_id+'.json')
    if file.is_file() and time.time()-file.stat().st_mtime <= 86400:
        response = json.loads(file.read_text(encoding='utf8'))
    else:
        key=os.environ.get('PIXABAY_API_KEY','')
        if not key: raise RuntimeError('Variável PIXABAY_API_KEY ausente (não passe a chave em argumentos).')
        url='https://pixabay.com/api/?'+urllib.parse.urlencode({'key':key,**params})
        req=urllib.request.Request(url,headers={'User-Agent':'EMPREST.AI Image Review/1.0'})
        with urllib.request.urlopen(req,timeout=20) as handle:
            response=json.load(handle)
        CACHE.mkdir(parents=True,exist_ok=True)
        file.write_text(json.dumps(response,ensure_ascii=False,indent=2),encoding='utf8')
    # Nunca reproduzir link de busca com a chave.
    candidates=[]
    for hit in response.get('hits',[]):
        candidates.append({'pixabayId':str(hit['id']),'pageURL':hit['pageURL'],'downloadURL':hit.get('largeImageURL') or hit.get('webformatURL'), 'photographer':hit['user'], 'tags':hit.get('tags','')})
    print(json.dumps({'assetTag':asset,'search':query,'candidates':candidates},ensure_ascii=False,indent=2))
    print('Selecione manualmente após revisar a imagem. Nenhuma foto foi baixada.',file=__import__('sys').stderr)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--asset',required=True);args=parser.parse_args();search(args.asset)
