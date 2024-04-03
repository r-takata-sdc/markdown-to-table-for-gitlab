function convertToTable() {
  const inputElement = document.getElementById("input")
  const input = inputElement?.value
  const lines = input.split('\n').filter(line => line.includes('|'));
  const headers = lines[0].split('|').slice(1, -1).map(header => header.trim());
  const rows = [];

  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').slice(1, -1).map(cell => {
      if (cell.includes('<ul><li>')) {
        const tasks = cell.match(/<li>(.*?)<\/li>/g).map(task => task.replace(/<\/?li>/g, '').trim());
        return `\n\n- ${tasks.map(task => `${task}`).join('\n- ')}\n\n`;
      } else {
        return cell.trim();
      }
    });
    rows.push(`<tr>\n${cells.map(cell => `<td>${cell}</td>\n`).join('')}</tr>`);
  }

  console.log(input)

  const table = `<table>
<thead>
<tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
/thead>
<tbody>
${rows.join('\n')}
</tbody>
</table>`;

  const outputElement = document.getElementById("output")
  outputElement.value = table
}

