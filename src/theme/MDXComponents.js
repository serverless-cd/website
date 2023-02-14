// 导入原映射
import MDXComponents from '@theme-original/MDXComponents';
import Trigger from '@site/src/components/Trigger';
import FieldTrigger from '@site/src/components/Trigger/FieldTrigger';
import StrictTrigger from '@site/src/components/Trigger/StrictTrigger';
import DisabledTrigger from '@site/src/components/Trigger/DisabledTrigger';
import CodeBase from '@site/src/components/CodeBase';
import MseArc from '@site/src/components/MseArc';
import DingTalkDemo from "@site/src/components/DingTalk";
import PreviewDingTalk from "@site/src/components/DingTalk/PreviewDingTalk";
import FieldDingTalk from "@site/src/components/DingTalk/FieldDingTalk";
import VariableUiDemo from "@site/src/components/Variable";
import FieldVariable from "@site/src/components/Variable/FieldVariable";
import TextVariable from "@site/src/components/Variable/TextVariable";
import Auth from '@site/src/components/Auth';
import LoginAuth from '@site/src/components/Auth/LoginAuth';
import RememberAuth from '@site/src/components/Auth/RememberAuth';
import RegisterAuth from '@site/src/components/Auth/RegisterAuth';

export default {
  // 复用默认的映射
  ...MDXComponents,
  // 把 "highlight" 标签映射到我们的 <Highlight /> 组件！
  // `Highlight` 会收到在 MDX 中被传递给 `highlight` 的所有 props
  TriggerDemo: Trigger,
  MseArc:MseArc,
  CodeBase,
  FieldTrigger,
  StrictTrigger,
  DisabledTrigger,
  DingTalk: DingTalkDemo,
  PreviewDingTalk,
  FieldDingTalk,
  VariableUi: VariableUiDemo,
  FieldVariable,
  TextVariable,
  Auth,
  LoginAuth,
  RememberAuth,
  RegisterAuth,
};
