import type { ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "./tab.scss";

export type AppTabItem = {
  content?: ReactNode;
  label: string;
  value: string;
};

type TabProps = {
  defaultValue?: string;
  tabs: AppTabItem[];
};

export default function Tab({
  defaultValue,
  tabs,
}: TabProps) {
  const activeTab = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs.Root
      className="app-tabs"
      defaultValue={activeTab}
    >
      <Tabs.List className="app-tabs-list">
        {tabs.map(tab => (
          <Tabs.Trigger
            className="app-tabs-trigger"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map(tab => (
        <Tabs.Content
          className="app-tabs-content"
          key={tab.value}
          value={tab.value}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
