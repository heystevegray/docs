import remarkGfm from 'remark-gfm'
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import { codeImport } from 'remark-code-import'
import rehypeHighlightLines, { HighlightLinesOptions } from 'rehype-highlight-code-lines'
import { visit } from 'unist-util-visit'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [rehypeHighlightLines, highlightLinesOptions],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          console.log({ node })
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            console.log({ codeEl })

            if (codeEl.tagName !== 'code') {
              return
            }

            node.__rawString__ = codeEl.children?.[0].value
            console.log({ __rawString__: codeEl.children?.[0].value })
          }
        })
      },
    ],
  },
})
