// 导入原映射
import MDXComponents from "@theme-original/MDXComponents";
import Trigger from "@site/src/components/Trigger";
import FieldTrigger from "@site/src/components/Trigger/FieldTrigger";
import StrictTrigger from "@site/src/components/Trigger/StrictTrigger";
import DisabledTrigger from "@site/src/components/Trigger/DisabledTrigger";
import PreViewTrigger from "@site/src/components/Trigger/PreView";
import DingTalkDemo from "@site/src/components/DingTalk";
import PreviewDingTalk from "@site/src/components/DingTalk/PreviewDingTalk";
import FieldDingTalk from "@site/src/components/DingTalk/FieldDingTalk";
import Variable from "@site/src/components/Variable/index";
import CreatingDemo from "@site/src/components/Creating/index";
import CreatingTasks from "@site/src/components/Creating/CreatingTasks";
import CreatingSuccess from "@site/src/components/Creating/CreatingSuccess";
import CreatingError from "@site/src/components/Creating/CreatingError";
import CreatingError2 from "@site/src/components/Creating/CreatingError2";
import CreatingError3 from "@site/src/components/Creating/CreatingError3";
import CreatingDown from "@site/src/components/Creating/CreatingDown";

import CodeBase from "@site/src/components/CodeBase";

export default {
  // 复用默认的映射
  ...MDXComponents,
  // 把 "highlight" 标签映射到我们的 <Highlight /> 组件！
  // `Highlight` 会收到在 MDX 中被传递给 `highlight` 的所有 props
  TriggerDemo: Trigger,
  CodeBase,
  FieldTrigger,
  StrictTrigger,
  DisabledTrigger,
  PreViewTrigger,
  DingTalk: DingTalkDemo,
  PreviewDingTalk,
  FieldDingTalk,
  VariableUi: Variable.VariableDemo,
  FieldVariable: Variable.FieldVariable,
  TextVariable: Variable.TextVariable,
  CreatingDemo,
  CreatingTasks,
  CreatingSuccess,
  CreatingError,
  CreatingError2,
  CreatingError3,
  CreatingDown,
};
