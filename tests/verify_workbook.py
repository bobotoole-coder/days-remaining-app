"""Compare actual browser-generated forms against the supplied template.
Usage: python3 tests/verify_workbook.py OUTPUT_DIR [ORIGINAL_TEMPLATE]
"""
import sys, zipfile, pathlib, xml.etree.ElementTree as E
root=pathlib.Path(__file__).resolve().parents[1]
folder=pathlib.Path(sys.argv[1]); original=pathlib.Path(sys.argv[2]) if len(sys.argv)>2 else root/'vendor/pickup-template.xlsx'
base=zipfile.ZipFile(original); ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
base_sheet=E.fromstring(base.read('xl/worksheets/sheet1.xml'))
modifiable={'xl/worksheets/sheet1.xml','xl/sharedStrings.xml','xl/worksheets/_rels/sheet1.xml.rels','docProps/core.xml'}
fields={3,4,5,6,7,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,29,32,33,34,35,36,37,38,39,40}
def value(cell,z):
 if cell is None:return ''
 if cell.get('t')=='inlineStr':return ''.join(t.text or '' for t in cell.findall('.//m:t',ns))
 v=cell.find('m:v',ns)
 if v is None:return ''
 if cell.get('t')=='s':
  ss=E.fromstring(z.read('xl/sharedStrings.xml'));return ''.join(t.text or '' for t in list(ss)[int(v.text)].findall('.//m:t',ns))
 return v.text or ''
for count in (1,2,3):
 z=zipfile.ZipFile(folder/f'pickup-{count}.xlsx'); assert z.testzip() is None
 assert set(z.namelist())==set(base.namelist()),'no added sheets or ZIP parts'
 for name in base.namelist():
  if name not in modifiable:assert z.read(name)==base.read(name),f'unchanged layout/styles/image: {name}'
 for name in z.namelist():
  if name.endswith('.xml') or name.endswith('.rels'):E.fromstring(z.read(name))
 sheet=E.fromstring(z.read('xl/worksheets/sheet1.xml')); cells={c.get('r'):c for c in sheet.findall('.//m:c',ns)}
 assert len(sheet.findall('m:sheetData/m:row',ns))==len(base_sheet.findall('m:sheetData/m:row',ns))
 # All worksheet structures apart from account/header values and hyperlinks are identical.
 for tag in ['dimension','sheetViews','sheetFormatPr','cols','sheetProtection','mergeCells','pageMargins','pageSetup','printOptions','drawing']:
  a=base_sheet.find('m:'+tag,ns);b=sheet.find('m:'+tag,ns)
  assert (E.tostring(a) if a is not None else None)==(E.tostring(b) if b is not None else None),tag
 for row in base_sheet.findall('m:sheetData/m:row',ns):
  counterpart=sheet.find("m:sheetData/m:row[@r='%s']"%row.get('r'),ns);assert row.attrib==counterpart.attrib
 for c in base_sheet.findall('.//m:c',ns):
  addr=c.get('r');cur=cells.get(addr);assert cur is not None,addr
  assert cur.get('s')==c.get('s'),f'cell style preserved: {addr}'
  if not (addr.startswith('B') and int(addr[1:]) in fields):assert value(cur,z)==value(c,base),f'unchanged label/note: {addr}'
 assert value(cells['B3'],z)=='Alex Tursick';assert value(cells['B5'],z)=="Bob O'Toole";assert value(cells['B7'],z)=='91'
 rels=E.fromstring(z.read('xl/worksheets/_rels/sheet1.xml.rels'));target={r.get('Id'):r.get('Target') for r in rels}
 for i in range(3):
  offset=i*11
  get=lambda row:value(cells.get('B'+str(row+offset)),z)
  if i<count:
   assert get(10)=='Example '+str(3-i);assert get(11)=='https://example.test/company/'+str(3-i)
   assert get(12)=='Netcentric';assert get(13)=='Prospect';assert get(14)=='United States';assert get(15)=='New York, NY';assert get(16)=='12+';assert get(17)=='2 confirmed';assert get(18)=='12345.67'
   link=sheet.find("m:hyperlinks/m:hyperlink[@ref='B%s']"%(11+offset),ns);assert link is not None
   assert target[link.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]==get(11),'clickable link matches account'
  else:
   assert all(get(row)=='' for row in range(10,19)),'unused account slots blank'
 text=' '.join(z.read(n).decode(errors='ignore') for n in z.namelist() if n.endswith('.xml'))
 assert not any(t in text for t in ['Private note','ON HOLD','HAS DUPLICATES','Pick Up Score','CitiusTech','TCDI','Viam, inc']),'no extra app data or stale examples'
 print(f'PASS {count}-account form: exact layout/styles/rows/sheets/images, fixed class/status, numeric MRC, headers, links, blank unused slots, no extra data')
