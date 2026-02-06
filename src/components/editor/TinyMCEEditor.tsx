'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  locale?: string;
}

export default function TinyMCEEditor({
  value,
  onChange,
  height = 600,
  locale = 'zh-CN',
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        toolbar_mode: 'sliding',
        max_height: 500,
        min_height: 300,
        branding: false,
        language: locale === 'en' ? 'en' : 'zh-CN',
        plugins: [
          'advlist',
          'anchor',
          'autolink',
          'autosave',
          'code',
          'codesample',
          'directionality',
          'emoticons',
          'fullscreen',
          'image',
          'insertdatetime',
          'link',
          'lists',
          'media',
          'nonbreaking',
          'pagebreak',
          'preview',
          'save',
          'searchreplace',
          'table',
          'visualblocks',
          'visualchars',
          'wordcount',
        ],
        toolbar:
          'fontfamily | fontsize | searchreplace | bold | italic | underline | strikethrough | alignleft | aligncenter | alignright | outdent | indent |  | blockquote | undo | redo | removeformat | subscript | superscript | code | codesample | hr | bullist | numlist | link | image | charmap | preview | anchor | pagebreak | insertdatetime | media | table | emoticons | forecolor | backcolor | fullscreen',
        content_style: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
            line-height: 1.8;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
          }
          img { max-width: 100%; height: auto; border-radius: 8px; }
          pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; }
          code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', 'Menlo', monospace; }
          blockquote { border-left: 4px solid #e5e7eb; margin: 0; padding-left: 20px; color: #6b7280; font-style: italic; }
          h1, h2, h3, h4, h5, h6 { color: #111827; font-weight: 600; margin-top: 32px; margin-bottom: 16px; }
          p { margin-bottom: 16px; }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
          th { background: #f9fafb; font-weight: 600; }
        `,
        image_advtab: true,
        image_title: true,
        image_description: true,
        image_dimensions: true,
        automatic_uploads: false,
        file_picker_types: 'image media',
        file_picker_callback: (callback: any, value: any, meta: any) => {
          if (meta.filetype === 'image') {
            const url = window.prompt('请输入图片 CDN 链接:', value);
            if (url) {
              callback(url, { alt: 'Image', title: 'Image' });
            }
          }
        },
        link_default_target: '_blank',
        link_assume_external_targets: true,
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'TypeScript', value: 'typescript' },
          { text: 'CSS', value: 'css' },
          { text: 'Python', value: 'python' },
          { text: 'Go', value: 'go' },
          { text: 'Rust', value: 'rust' },
          { text: 'SQL', value: 'sql' },
          { text: 'Bash', value: 'bash' },
          { text: 'JSON', value: 'json' },
          { text: 'YAML', value: 'yaml' },
        ],
        promotion: false,
        resize: true,
        statusbar: true,
        elementpath: false,
      }}
    />
  );
}
