
function downloadPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('今日羞耻报告', 14, 20);
  doc.setFontSize(12);
  doc.text('舔  '+lickCnt, 14, 32);
  doc.text('夹  '+clampCnt, 14, 40);
  doc.text('违令 '+violateCnt,14,48);
  doc.text('射  '+shootCnt, 14, 56);
  doc.save('xiaomao_report.pdf');
}
