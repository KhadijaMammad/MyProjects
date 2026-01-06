const replaceMap = {
  'ə': 'e',
  'ğ': 'g',
  'ç': 'c',
  'ö': 'o',
  'ş': 's',
  'ı': 'i',
  'ü': 'u',
  
};

const normalizeText = (text) => {
  return text
    .toLowerCase() 
    .replace(/[^a-z0-9\s-]/g, (char) => replaceMap[char] || '')
    .trim();
};

module.exports= normalizeText