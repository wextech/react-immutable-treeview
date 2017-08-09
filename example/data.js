export default {
  title: "react-immutable-treeview",
  expanded: true,
  activated: true,
  children: [
    {
      title: "normal",
      expanded: true,
      children: [
        {
          title: "normal_child",
          expanded: true
        },
        {
          title: "normal_child_with_data",
          data: {
            anyKey: "anyValue"
          }
        },
        {
          title: "normal_child_with_children",
          expanded: false,
          children: [
            {
              title: "child1"
            },
            {
              title: "child2"
            },
            {
              title: "child3"
            },
            {
              title: "child4",
              children:[]
            }
          ]
        }
      ]
    }
  ]
};
