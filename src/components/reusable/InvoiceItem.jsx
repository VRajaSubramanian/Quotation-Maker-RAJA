import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import EditableField from "./EditableField";
import { BiTrash } from "react-icons/bi";

export default function InvoiceItem(props) {
  var itemTable = props.items.map((item) => (
    <ItemRow
      onItemizedItemEdit={props.onItemizedItemEdit}
      item={item}
      onDelEvent={props.onRowDel}
      key={item.id}
      currency={props.currency}
    />
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="text-center">Name Of Work</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Amount</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </table>
      <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button>
    </div>
  );
}

function ItemRow(props) {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  return (
    <tr>
      <td style={{ width: "550px", margin: "50px", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <EditableField
            onItemizedItemEdit={props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item Name",
              value: props.item.name,
              id: props.item.id,
            }}
          />
        </div>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item Description",
            value: props.item.description,
            id: props.item.id,
          }}
        />
      </td>

      <td style={{ minWidth: "110px", padding: "15px", maxWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: 1,
            textAlign: "text-end",
            value: props.item.quantity,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px", maxWidth: "90px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "price",
            min: 0,
            step: 1,
            textAlign: "text-end",
            value: props.item.price,
            id: props.item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: 70 }}>
        <BiTrash
          onClick={onDelEvent}
          style={{
            height: "33px",
            width: "33px",
            padding: "7.5px",
            margin: "5px",
          }}
          className="text-white btn btn-danger"
        />
      </td>
    </tr>
  );
}
