// 导入原映射
import MDXComponents from '@theme-original/MDXComponents';
import Trigger from '@site/src/components/Trigger';
import FieldTrigger from '@site/src/components/Trigger/FieldTrigger';
import StrictTrigger from '@site/src/components/Trigger/StrictTrigger';
import DisabledTrigger from '@site/src/components/Trigger/DisabledTrigger';
import DingTalkDemo from '@site/src/components/DingTalk';
import PreviewDingTalk from '@site/src/components/DingTalk/PreviewDingTalk';
import FieldDingTalk from '@site/src/components/DingTalk/FieldDingTalk';
import Variable from '@site/src/components/Variable/index';
import CodeBase from '@site/src/components/CodeBase';
import AppCard from '@site/src/components/AppCard';
import AppCardMany from '@site/src/components/AppCard/Many';
import AppCardReadMe from '@site/src/components/AppCard/Readme';
import AppCardReadmeWithActiveTab from '@site/src/components/AppCard/ReadmeWithActiveTab';
import AppCardReadmeWithApiType from '@site/src/components/AppCard/ApiType';
import AppCardReadmeWithFetchReadme from '@site/src/components/AppCard/FetchReadme';

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
  DingTalk: DingTalkDemo,
  PreviewDingTalk,
  FieldDingTalk,
  VariableUi: Variable.VariableDemo,
  FieldVariable: Variable.FieldVariable,
  TextVariable: Variable.TextVariable,
  AppCard,
  AppCardMany,
  AppCardReadMe,
  AppCardReadmeWithActiveTab,
  AppCardReadmeWithApiType,
  AppCardReadmeWithFetchReadme,
};
