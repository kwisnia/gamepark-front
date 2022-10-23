import { IconButton, Wrap, WrapItem } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import {
  AiOutlineBold,
  AiOutlineCode,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUndo,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsBlockquoteLeft, BsParagraph } from "react-icons/bs";
import { BiHeading } from "react-icons/bi";
import ToolbarButton from "./ToolbarButton";

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <Wrap>
      <WrapItem>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
          label="Bold"
          icon={<AiOutlineBold />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
          label="Italic"
          icon={<AiOutlineItalic />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
          label="Strike"
          icon={<AiOutlineStrikethrough />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          isActive={editor?.isActive("codeBlock")}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          label="Code block"
          icon={<AiOutlineCode />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          isActive={editor?.isActive("heading", { level: 1 })}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          label="Heading 1"
          icon={<BiHeading />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          isActive={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          label="Bullet list"
          icon={<AiOutlineUnorderedList />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          isActive={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          label="Ordered list"
          icon={<AiOutlineOrderedList />}
        />
      </WrapItem>
      <WrapItem>
        <ToolbarButton
          isActive={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          label="Blockquote"
          icon={<BsBlockquoteLeft />}
        />
      </WrapItem>
      <WrapItem>
        <IconButton
          variant="ghost"
          icon={<BsParagraph />}
          aria-label="Paragraph"
          onClick={() => editor?.chain().focus().setParagraph().run()}
        />
      </WrapItem>
      <WrapItem>
        <IconButton
          variant="ghost"
          icon={<AiOutlineUndo />}
          aria-label="Undo"
          onClick={() => editor?.chain().focus().undo().run()}
        />
      </WrapItem>
      <WrapItem>
        <IconButton
          variant="ghost"
          icon={<AiOutlineRedo />}
          aria-label="Undo"
          onClick={() => editor?.chain().focus().undo().run()}
        />
      </WrapItem>
    </Wrap>
  );
};

export default Toolbar;
