import remarkGfm from 'remark-gfm'
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import { codeImport } from 'remark-code-import'
import rehypeHighlightLines, { HighlightLinesOptions } from 'rehype-highlight-code-lines'
import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Element } from 'hast'

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    kind: {
      type: 'enum',
      options: ['component', 'override'],
      required: true,
    },
  },
  computedFields: {
    slug: { type: 'string', resolve: (docs) => `/docs/${docs._raw.flattenedPath}` },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}))

const prettyCodeOptions: Options = {
  theme: 'github-dark',
  defaultLang: 'tsx',
}

const highlightLinesOptions: HighlightLinesOptions = {
  showLineNumbers: true,
}

const isTextNode = (node: Node): node is Node & { value: string } => {
  return node.type === 'text' && 'value' in node
}

const extractText = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (isTextNode(node)) {
        return node.value
      } else if (node.type === 'element' && (node as Element).children) {
        return extractText((node as Element).children)
      }
      return ''
    })
    .join('')
}

const addSourceCodeToNodeTreeSoICanAccessItInTheCopyButtonInMDX = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre' && node.children && node.children[0].type === 'element' && node.children[0].tagName === 'code') {
        const rawString = extractText(node.children[0].children)
        console.log({ rawString })
        node.properties.sourceCodeText = rawString
      }
    })
  }
}

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], [rehypeHighlightLines, highlightLinesOptions], addSourceCodeToNodeTreeSoICanAccessItInTheCopyButtonInMDX],
  },
})
