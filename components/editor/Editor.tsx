import { Box } from "@chakra-ui/react";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar/Toolbar";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Image,
    ],
  });

  return (
    <Box bg="gray.600" rounded="lg" minH="44">
      <Toolbar editor={editor} />
      <Box p="1.25rem 1rem" flex="1 1 auto" overflowX="hidden" overflowY="auto">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default Editor;
