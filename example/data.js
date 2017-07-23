export default {
  title: "react-immutable-treeview",
  expanded: true,
  children: [
    {
      title: "normal",
      children: [
        {
          title: "normal_child"
        },
        {
          title: "normal_child_with_data",
          data: {
            anyKey: "nayValue"
          }
        },
        {
          title: "normal_child_with_children",
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
              title: "child4"
            }
          ]
        }
      ]
    }
  ]
};
