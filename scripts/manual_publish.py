#!/usr/bin/env python3
"""Utilitário para EXECUÇÃO HUMANA: operação de produção nunca executada pelo agente.

Sem --apply apenas mostra checklist local. Com --apply faz alterações remotas após
verificar doze fotos e confirmação interativa explícita. Não coloque chaves em args.
"""
import argparse, getpass, json, os, pathlib, subprocess, sys, urllib.parse, urllib.request, urllib.error
ROOT=pathlib.Path(__file__).resolve().parents[1]
SCRIPTS=ROOT/'frontend/skills/imagens-equipamentos/scripts'
PROJECT_REF=os.environ.get('EXPECTED_SUPABASE_PROJECT_REF','ubqafowwlgodwhrxturg')
BUCKET='equipment-images'
EMAIL='marcelo.grilo@institutojef.org.br'

def rest(base:str, service_key:str, method:str, path:str, body=None, extra=None):
    url=base+path
    headers={'apikey':service_key,'Authorization':f'Bearer {service_key}',**(extra or {})}
    if isinstance(body,(dict,list)):
        data=json.dumps(body,ensure_ascii=False).encode('utf-8')
        headers['Content-Type']='application/json'
    else:data=body
    req=urllib.request.Request(url,method=method,data=data,headers=headers)
    try:
        with urllib.request.urlopen(req,timeout=30) as res:
            raw=res.read(1_000_000)
            return res.status,json.loads(raw) if raw and (res.headers.get('Content-Type','').startswith('application/json')) else None
    except urllib.error.HTTPError as e:
        if e.code in (404,409): return e.code,None
        # Não reproduzir corpo da resposta que possa conter configuração privada.
        raise RuntimeError(f'Supabase retornou HTTP {e.code} ao acessar recurso autorizado.')

def preflight(manifest,base,key):
    # Verifica bucket criado manualmente: agentes não criam bucket em produção.
    status,_=rest(base,key,'GET',f'/storage/v1/bucket/{BUCKET}')
    if status!=200:raise RuntimeError('Crie primeiro bucket PÚBLICO equipment-images no Supabase Storage.')
    # A migration 002 deve ter sido executada manualmente antes de publicar fotos.
    status,_=rest(base,key,'GET','/rest/v1/equipment?select=photo_url&limit=0')
    if status!=200:raise RuntimeError('A migration de fotos ainda não foi aplicada ao banco.')
    return True

def ensure_professor(base,key,password):
    if not password or len(password)<8:raise RuntimeError('PROFESSOR_INITIAL_PASSWORD inválida ou ausente.')
    status,response=rest(base,key,'GET','/auth/v1/admin/users?per_page=100&page=1')
    if status!=200:raise RuntimeError('Não foi possível consultar Auth Users.')
    found=next((x for x in response.get('users',[]) if x.get('email','').lower()==EMAIL),None)
    if found:
        uid=found['id']
        # Nunca redefinir senha de conta existente silenciosamente.
    else:
        status,created=rest(base,key,'POST','/auth/v1/admin/users',{'email':EMAIL,'password':password,'email_confirm':True})
        if status not in (200,201) or not created:raise RuntimeError('Criação do usuário Auth falhou.')
        uid=created['id']
    q=urllib.parse.urlencode({'select':'id','user_id':'eq.'+uid})
    status,loans=rest(base,key,'GET','/rest/v1/loans?'+q)
    if status!=200 or loans:raise RuntimeError('O usuário do professor já possui empréstimos, operação interrompida para revisão humana.')
    query=urllib.parse.urlencode({'select':'id','email':'eq.'+EMAIL})
    status,profiles=rest(base,key,'GET','/rest/v1/users?'+query)
    if status!=200:raise RuntimeError('A tabela users não pôde ser consultada.')
    if profiles:
        uid_profile=profiles[0]['id']
        status,loan_list=rest(base,key,'GET','/rest/v1/loans?select=id&user_id=eq.'+uid_profile)
        if status!=200 or loan_list:raise RuntimeError('Já existem empréstimos no perfil da conta do professor.')
    else:
        status,_=rest(base,key,'POST','/rest/v1/users',{'id':uid,'email':EMAIL,'name':'Marcelo Grilo','role':'COLLABORATOR'})
        if status not in (200,201,204):raise RuntimeError('Não foi possível cadastrar o perfil do professor.')
    return 'conta do professor verificada sem empréstimos; senha não exibida'

def publish_assets(base,key,manifest):
    for item in manifest:
        tag=item['assetTag'];filename=ROOT/item['imageFile']
        file_bytes=filename.read_bytes()
        # Usar caminho determinístico; reexecução não duplica objeto.
        path=f'/storage/v1/object/{BUCKET}/{tag}.jpg'
        status,_=rest(base,key,'POST',path,file_bytes,{'Content-Type':'image/jpeg','x-upsert':'false'})
        if status not in (200,201,204,409): raise RuntimeError(f'Upload da imagem não concluído: {tag}')
        public=f'{base}/storage/v1/object/public/{BUCKET}/{tag}.jpg'
        original={'name':item['name'],'category':item['category'],'asset_tag':tag,'status':item['status']}
        image_fields={'photo_url':public,'photo_source_url':item['sourceURL'],'photo_author':item['photographer'],'photo_id':str(item['pixabayId']),'photo_license':item['license']}
        encoded=urllib.parse.urlencode({'select':'id,name,category,status','asset_tag':'eq.'+tag})
        status,current=rest(base,key,'GET','/rest/v1/equipment?'+encoded)
        if status!=200:raise RuntimeError(f'Não foi possível verificar patrimônio: {tag}')
        if current:
            previous=current[0]
            if previous['name']!=item['name'] or previous['category']!=item['category']:
                raise RuntimeError(f'Patrimônio {tag} existe com nome/categoria divergentes: revisar manualmente.')
            # Não reatribuir status de equipamento com empréstimo; update somente foto.
            status,_=rest(base,key,'PATCH','/rest/v1/equipment?asset_tag=eq.'+urllib.parse.quote(tag),image_fields)
            if status not in (200,204):raise RuntimeError(f'Atualização de créditos falhou: {tag}')
        else:
            status,_=rest(base,key,'POST','/rest/v1/equipment',{**original,**image_fields})
            if status not in (200,201,204):raise RuntimeError(f'Cadastro do equipamento falhou: {tag}')
        print(f'OK: {tag} (foto por ID e patrimônio; nenhuma imagem duplicada)')

def main():
    p=argparse.ArgumentParser();p.add_argument('--apply',action='store_true',help='ESCRITA REAL — somente operador humano, após aprovação e teste em staging')
    args=p.parse_args()
    seed=json.loads((ROOT/'data/equipment.seed.json').read_text(encoding='utf8'))
    print(f'Plano: {len(seed)} patrimônios, 3 em manutenção, fotos Pixabay individuais, conta docente sem empréstimos.')
    if not args.apply:
        print('DRY RUN: zero conexão externa e zero escrita. Próximo passo: validar as imagens e executar manualmente --apply.');return
    subprocess.run([sys.executable,str(SCRIPTS/'validate_images.py')],check=True)
    base=os.environ.get('SUPABASE_URL','').rstrip('/')
    key=os.environ.get('SUPABASE_SERVICE_ROLE_KEY','')
    password=os.environ.get('PROFESSOR_INITIAL_PASSWORD','') or getpass.getpass('Senha inicial da conta docente (não será gravada): ')
    expected=f'https://{PROJECT_REF}.supabase.co'
    if base!=expected or not key:raise RuntimeError('Ambiente de destino ou segredo ausente: abortado. Aplique primeiro em staging isolado.')
    message='APLICAR EMPREST.AI EM PRODUCAO' if PROJECT_REF=='ubqafowwlgodwhrxturg' else 'APLICAR EM STAGING'
    text=input(f'ATENÇÃO: ambiente {PROJECT_REF} com escrita real. Digite exatamente {message}: ')
    if text!=message:raise RuntimeError('Confirmação não reconhecida. Nenhuma mudança enviada.')
    manifest=json.loads((ROOT/'data/ready-images.json').read_text(encoding='utf8'))
    preflight(manifest,base,key)
    publish_assets(base,key,manifest)
    print(ensure_professor(base,key,password))
    print('Verifique a lista e os créditos no navegador; teste empréstimos com OUTRA conta, jamais com a do professor.')
if __name__=='__main__':main()
