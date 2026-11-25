'use strict';

const draft = document.querySelector('#draft');
const clear = document.querySelector('#clear');
const total = document.querySelector('#total');
const compact = document.querySelector('#compact');
const lines = document.querySelector('#lines');
const sheets = document.querySelector('#sheets');
const formatter = new Intl.NumberFormat('ja-JP');
const sheetFormatter = new Intl.NumberFormat('ja-JP', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const segmenter = typeof Intl.Segmenter === 'function'
  ? new Intl.Segmenter('ja', { granularity: 'grapheme' })
  : null;

function countCharacters(text) {
  const units = segmenter ? segmenter.segment(text) : text;
  let count = 0;
  for (const unit of units) count += 1;
  return count;
}

function updateCounts() {
  const text = draft.value;
  const withoutWhitespace = countCharacters(text.replace(/\s/gu, ''));

  total.value = formatter.format(countCharacters(text));
  compact.value = formatter.format(withoutWhitespace);
  lines.value = formatter.format(text ? text.split('\n').length : 0);
  sheets.value = sheetFormatter.format(withoutWhitespace / 400);
  clear.disabled = text.length === 0;
}

draft.addEventListener('input', updateCounts);
clear.addEventListener('click', () => {
  draft.value = '';
  draft.focus();
  updateCounts();
});
window.addEventListener('pageshow', updateCounts);
updateCounts();
