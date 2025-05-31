
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MessageRendererProps {
  text: string;
  isUser: boolean;
}

export function MessageRenderer({ text, isUser }: MessageRendererProps) {
  const renderStructuredText = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let currentTable: string[][] = [];
    let inCodeBlock = false;
    let codeContent = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside space-y-1 my-2">
            {currentList}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = () => {
      if (currentTable.length > 0) {
        const headers = currentTable[0];
        const rows = currentTable.slice(1);
        elements.push(
          <div key={elements.length} className="my-2 overflow-x-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  {headers.map((header, i) => (
                    <TableHead key={i} className="text-xs font-medium">
                      {header.trim()}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j} className="text-xs py-1">
                        {cell.trim()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        currentTable = [];
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={elements.length} className="bg-gray-200 rounded p-2 text-xs overflow-x-auto my-2">
              <code>{codeContent}</code>
            </pre>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          flushList();
          flushTable();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Handle tables
      if (line.includes('|') && line.split('|').length > 2) {
        flushList();
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        currentTable.push(cells);
        return;
      } else {
        flushTable();
      }

      // Handle lists
      if (line.trim().match(/^[-*]\s/) || line.trim().match(/^\d+\.\s/)) {
        const listItem = line.trim().replace(/^[-*]\s/, '').replace(/^\d+\.\s/, '');
        currentList.push(
          <li key={currentList.length} className="text-sm">
            {formatInlineText(listItem)}
          </li>
        );
        return;
      } else {
        flushList();
      }

      // Handle headings
      if (line.trim().startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        const sizeClass = level === 1 ? 'text-lg font-bold' : 
                         level === 2 ? 'text-base font-semibold' : 
                         'text-sm font-medium';
        
        elements.push(
          <HeadingTag key={elements.length} className={`${sizeClass} my-2`}>
            {formatInlineText(text)}
          </HeadingTag>
        );
        return;
      }

      // Handle regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={elements.length} className="text-sm mb-2">
            {formatInlineText(line)}
          </p>
        );
      }
    });

    // Flush any remaining items
    flushList();
    flushTable();

    return elements;
  };

  const formatInlineText = (text: string) => {
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Handle inline code
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded text-xs">$1</code>');
    
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={`${isUser ? 'text-white' : 'text-gray-800'}`}>
      {renderStructuredText(text)}
    </div>
  );
}
