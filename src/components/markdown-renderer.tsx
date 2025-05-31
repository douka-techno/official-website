// This is a very basic Markdown renderer.
// For a production app, you'd likely use a library like 'react-markdown'
// with plugins for syntax highlighting, GFM, etc.
// For now, this will just render paragraphs and headings.

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\\n');
  const elements = lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-semibold mt-6 mb-2">{line.substring(4)}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-semibold mt-8 mb-3 border-b pb-2">{line.substring(3)}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-semibold mt-10 mb-4 border-b pb-2">{line.substring(2)}</h1>;
    }
    if (line.startsWith('- ')) {
      // This is a very naive list item handling, better to use a proper parser
      return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
    }
    if (line.trim() === '') {
      return null; // Skip empty lines instead of <br />
    }
    return <p key={index} className="my-4 text-foreground/90 leading-relaxed">{line}</p>;
  });

  // Crude list handling - wrap consecutive li elements in ul
  const groupedElements = [];
  let currentListItems = [];
  for (const el of elements) {
    if (el && el.type === 'li') {
      currentListItems.push(el);
    } else {
      if (currentListItems.length > 0) {
        groupedElements.push(<ul key={`ul-${groupedElements.length}`} className="my-4 space-y-1">{currentListItems}</ul>);
        currentListItems = [];
      }
      if (el) { // Add non-list element if it's not null
        groupedElements.push(el);
      }
    }
  }
  if (currentListItems.length > 0) {
     groupedElements.push(<ul key={`ul-${groupedElements.length}`} className="my-4 space-y-1">{currentListItems}</ul>);
  }


  return <div className="prose dark:prose-invert max-w-none">{groupedElements}</div>;
}
