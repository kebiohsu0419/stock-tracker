export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { ticker } = req.query;
  if (!ticker) return res.status(400).json({ error: 'missing ticker' });
  try {
    const r = await fetch(`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${ticker}.tw`);
    const d = await r.json();
    const item = d?.msgArray?.[0];
    if (!item) return res.status(404).json({ error: 'not found' });
    const price = parseFloat(item.z !== '-' ? item.z : item.y);
    const name = item.n;
    res.json({ ticker, name, price });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
