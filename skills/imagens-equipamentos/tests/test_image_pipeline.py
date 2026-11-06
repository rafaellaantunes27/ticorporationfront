import io, tempfile, unittest, pathlib, sys
from PIL import Image
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'scripts'))
from prepare_pixabay_image import normalize
from validate_images import validate_records

class ImageTests(unittest.TestCase):
 def source(self, width=1200, height=900, color=(30,80,140)):
  image=Image.new('RGB',(width,height),color)
  buffer=io.BytesIO();image.save(buffer,format='PNG')
  return buffer.getvalue()

 def test_IMG_CA_03_800x600_JPEG(self):
  prepared=normalize(self.source())
  with Image.open(io.BytesIO(prepared)) as image:
   self.assertEqual(image.size,(800,600));self.assertEqual(image.format,'JPEG');self.assertEqual(image.mode,'RGB')

 def test_IMG_CA_03_small_image_rejected(self):
  with self.assertRaisesRegex(ValueError,'resolução'):
   normalize(self.source(320,240))

 def test_IMG_CA_04_repeated_photo_id_rejected(self):
  with tempfile.TemporaryDirectory() as temp:
   p=pathlib.Path(temp)
   (p/'TI-0001.jpg').write_bytes(normalize(self.source(color=(12,10,4))))
   (p/'TI-0002.jpg').write_bytes(normalize(self.source(color=(12,70,90))))
   records=[{'assetTag':'TI-0001'}, {'assetTag':'TI-0002'}]
   approvals=[{'assetTag':x['assetTag'],'pixabayId':'123', 'pageURL':'https://pixabay.com/photo/123','photographer':'Autor','visuallyApproved':True,'reviewedBy':'Human'} for x in records]
   with self.assertRaisesRegex(ValueError,'duplicada'):
    validate_records(records, approvals, p, strict_seed=False)

 def test_IMG_CA_04_repeated_file_hash_rejected(self):
  with tempfile.TemporaryDirectory() as temp:
   p=pathlib.Path(temp); data=normalize(self.source())
   (p/'TI-0001.jpg').write_bytes(data);(p/'TI-0002.jpg').write_bytes(data)
   records=[{'assetTag':'TI-0001'}, {'assetTag':'TI-0002'}]
   approvals=[{'assetTag':r['assetTag'],'pixabayId':str(i), 'pageURL':'https://pixabay.com/photo/'+str(i),'photographer':'Autor','visuallyApproved':True,'reviewedBy':'Human'} for i,r in enumerate(records)]
   with self.assertRaisesRegex(ValueError,'duplicada'):
    validate_records(records,approvals,p, strict_seed=False)

 def test_IMG_CA_02_no_review_is_not_approved(self):
  with tempfile.TemporaryDirectory() as temp:
   p=pathlib.Path(temp);(p/'TI-0001.jpg').write_bytes(normalize(self.source()))
   record={'assetTag':'TI-0001'}
   approved={'assetTag':'TI-0001','pixabayId':'1','pageURL':'https://pixabay.com/photo/1','photographer':'Autor','reviewedBy':'Human','visuallyApproved':False}
   with self.assertRaisesRegex(ValueError,'aprovação'):
    validate_records([record],[approved],p, strict_seed=False)

if __name__=='__main__':unittest.main()
