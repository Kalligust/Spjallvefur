import {
  BiBold,
  BiCode,
  BiUnderline,
  BiStrikethrough,
  BiItalic,
} from "react-icons/bi";

import { BsChatLeftQuote } from "react-icons/bs";

import { GoListUnordered, GoListOrdered } from "react-icons/go";

export const inlineStyles = [
  {
    id: "Bold",
    value: "Bold",
    style: "BOLD",
    icon: BiBold,
  },

  {
    id: "Italic",
    value: "Italic",
    style: "ITALIC",
    icon: BiItalic,
  },

  {
    id: "Underline",
    value: "Underline",
    style: "UNDERLINE",
    icon: BiUnderline,
  },

  {
    id: "StrikeThrough",
    value: "Strikethrough",
    style: "STRIKETHROUGH",
    icon: BiStrikethrough,
  },

  {
    id: "Code",
    value: "Code",
    style: "CODE",
    icon: BiCode,
  },
];

export const blockTypes = [
  // {
  //   id: "Heading One",
  //   value: "Heading One",
  //   block: "header-one",
  // },

  // {
  //   id: "Heading Two",
  //   value: "Heading Two",
  //   block: "header-two",
  // },

  // {
  //   id: "Heading Three",
  //   value: "Heading Three",
  //   block: "header-three",
  // },

  {
    id: "BlockQuote",
    value: "Blockquote",
    block: "blockquote",
    icon: BsChatLeftQuote,
  },

  {
    id: "Unordered List",
    value: "Unordered List",
    block: "unordered-list-item",
    icon: GoListUnordered,
  },

  {
    id: "Ordered List",
    value: "Ordered List",
    block: "ordered-list-item",
    icon: GoListOrdered,
  },
];
