import { Collapse } from "antd";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

type Props = {
  data: {
    title: string;
    description: string;
  }[];
};

const { Panel } = Collapse;

function CollapseDescription({ data }: Props) {
  return (
    <Collapse
      defaultActiveKey={["1", "2", "3", "4"]}
      expandIcon={({ isActive }) => (
        <AiFillCaretRight
          size={18}
          style={{
            transform: `rotate(${isActive ? "90deg" : "0deg"})`,
            transition: "all .3s ease",
            color: "#039650",
          }}
        />
      )}
      className="collapse-description"
    >
      {data?.map((item, index) => (
        <Panel header={item?.title} key={`${index + 1}`}>
          <div
            className="description-content"
            dangerouslySetInnerHTML={{
              __html: item?.description,
            }}
          ></div>
        </Panel>
      ))}
    </Collapse>
  );
}

export default CollapseDescription;
