// 导入原映射
import MDXComponents from '@theme-original/MDXComponents';
import Trigger from '@site/src/components/Trigger';
import FieldTrigger from '@site/src/components/Trigger/FieldTrigger';
import StrictTrigger from '@site/src/components/Trigger/StrictTrigger';
import DisabledTrigger from '@site/src/components/Trigger/DisabledTrigger';
import CodeBase from '@site/src/components/CodeBase';


export default {
  // 复用默认的映射
  ...MDXComponents,
  // 把 "highlight" 标签映射到我们的 <Highlight /> 组件！
  // `Highlight` 会收到在 MDX 中被传递给 `highlight` 的所有 props
  TriggerDemo: Trigger,
  CodeBase: CodeBase,
  FieldTrigger: FieldTrigger,
  StrictTrigger: StrictTrigger,
  DisabledTrigger: DisabledTrigger
};