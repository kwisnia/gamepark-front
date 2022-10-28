import { Box } from "@chakra-ui/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Indentation } from "./extensions/Indentation";
import { SmilieReplacer } from "./extensions/SmileReplacer";
import { Spoiler } from "./extensions/Spoiler";

interface OutputEditorProps {
  content: string;
}

const OutputEditor = ({ content }: OutputEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Indentation,
      SmilieReplacer,
      Spoiler,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
      }),
      Youtube,
    ],
    content,
    editable: false,
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor?.commands]);

  return (
    <Box bg="gray.700" rounded="lg" minH="30" p={5}>
      <Box flex="1 1 auto" overflowX="hidden" overflowY="auto">
        <EditorContent editor={editor} content={content} />
      </Box>
    </Box>
  );
};

export default OutputEditor;
