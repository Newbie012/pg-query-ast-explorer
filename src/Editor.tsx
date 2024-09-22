import React from "react";
import { useEventCallback } from "usehooks-ts";
import { monaco, normalizeIndent } from "./monaco";

const DEFAULT_VALUE = normalizeIndent`
  -- Select specific columns from a table
  SELECT 
      users.id,         -- The user's unique ID
      users.username,   -- The username of the user
      COUNT(orders.id) AS total_orders,  -- Total number of orders per user (using aggregate function)
      SUM(orders.amount) AS total_amount -- Sum of all order amounts per user
  FROM 
      users            -- Primary table 'users'
  -- Join with the 'orders' table to link user data with their orders
  LEFT JOIN orders 
      ON users.id = orders.user_id  -- Match the user's ID to their corresponding orders
  -- Filter users who have made at least one order
  WHERE 
      orders.id IS NOT NULL
  -- Group the results by the user to calculate total orders and amount per user
  GROUP BY 
      users.id,        -- Group by user ID to aggregate orders and amounts
      users.username   -- Group by username to include it in the result
  -- Filter groups to include only those with more than 5 total orders
  HAVING 
      COUNT(orders.id) > 5
  -- Order the results by the total order amount in descending order
  ORDER BY 
      total_amount DESC
  -- Limit the results to the top 10 users
  LIMIT 10;
`;

interface EditorProps {
  onChange: (value: string) => void;
}

export default function Editor(props: EditorProps) {
  const onChange = useEventCallback(props.onChange);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const model = monaco.editor.createModel(DEFAULT_VALUE, "sql");

    // Create the editor
    const editor = monaco.editor.create(ref.current, {
      model: model,
      language: "sql",
      theme: "min-light",
      fontSize: 14,
      minimap: { enabled: false }, // Disable the minimap
      automaticLayout: true,
    });

    if (model) {
      onChange(model.getValue());
      model.onDidChangeContent(() => onChange(model.getValue()));
    }

    return () => editor.dispose();
  }, [onChange]);

  return <div ref={ref} className="h-full" />;
}
