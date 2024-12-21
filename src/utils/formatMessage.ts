export function formatMessage(content: string): string {
  // 处理代码块
  content = content.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="bg-gray-800 text-gray-100 rounded-lg p-4 my-2 overflow-x-auto"><code class="language-$1">$2</code></pre>'
  )

  // 处理行内代码
  content = content.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 text-gray-800 rounded px-1 py-0.5">$1</code>'
  )

  // 处理标题
  content = content.replace(
    /^### (.*$)/gm,
    '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>'
  )
  content = content.replace(
    /^## (.*$)/gm,
    '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>'
  )
  content = content.replace(
    /^# (.*$)/gm,
    '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>'
  )

  // 处理列表
  content = content.replace(
    /^\s*[-*+]\s(.*)$/gm,
    '<li class="ml-4">• $1</li>'
  )
  content = content.replace(
    /^\s*\d+\.\s(.*)$/gm,
    '<li class="ml-4 list-decimal">$1</li>'
  )

  // 处理段落
  content = content.replace(
    /\n\n(.*?)\n\n/g,
    '\n\n<p class="my-2">$1</p>\n\n'
  )

  // 处理��接
  content = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  return content
} 