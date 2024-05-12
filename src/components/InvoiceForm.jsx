import React, { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import InvoiceItem from "./reusable/InvoiceItem";
import { Button } from "react-bootstrap";
import InvoiceModal from "./reusable/InvoiceModal";
export default function InvoiceForm() {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: "",
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "V.R.S ELECTRICAL WORKS",
    billFromEmail: "vrselectricalworkstvl@gmail.com",
    billFromAddress: "25, I Parasakthi Building, Tirunelveli, Juction.",
    notes: "",
    subTotal: "0.00",
    taxRate: 0,
    taxAmount: "0.00",
    discountRate: 0,
    discountAmount: "0.00",
    extraWork: "",
    purpose: "",
  });
  const [total, setTotal] = useState(0.0);
  const [items, setItems] = useState([
    {
      id: "0",
      name: "",
      description: "",
      price: 1.0,
      quantity: 1,
    },
  ]);
  const onchange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const onItemizedItemEdit = (event) => {
    const individualItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    var newItems = items.map((item) => {
      for (var key in item) {
        if (key === individualItem.name && item.id === individualItem.id) {
          item[key] = individualItem.value;
        }
      }
      return item;
    });
    setItems(newItems);
  };

  const handleAddEvent = (e) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id,
      name: "",
      price: 1.0,
      description: "",
      quantity: 1,
    };
    setItems((items) => [...items, item]);
  };

  const handleRowDel = (item) => {
    if (items.length > 1) {
      setItems((items) => items.filter((data) => data.id !== item.id));
    } else {
      setItems([
        {
          id: "0",
          name: "",
          description: "",
          price: 1.0,
          quantity: 1,
        },
      ]);
    }
  };

  const onCurrencyChange = (selectedOption) => {
    setState((state) => ({ ...state, selectedOption }));
  };

  const handleCalculateTotal = (items) => {
    var subTotal = 0;
    items.map((item) => {
      subTotal += parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
    })[0];

    const discountAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.discountRate / 100)
    ).toFixed(2);

    const taxAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.taxRate / 100)
    ).toFixed(2);

    const total = parseFloat(
      subTotal + parseFloat(taxAmount) - parseFloat(discountAmount)
    );
    setTotal(total);
    setState((state) => ({
      ...state,
      subTotal,
      taxAmount,
      discountAmount,
    }));
  };
  useEffect(() => {
    handleCalculateTotal(items);
  }, [items, state.taxRate, state.discountRate]);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setState((state) => ({ ...state, isOpen: true }));
      }}
    >
      <Row>
        <div className="cont text-center">
          <h2>V.R.S ELECTRICAL WORKS</h2>
          <h3>Licensed Electrical Wiring Contractor</h3>
        </div>
        <Col md={8} lg={9}>
          <Card className="d-flex p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                  <span className="current-date">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">Invoice&nbsp;Number:&nbsp;</span>
                  <span className="current-date">{state.invoiceNumber}</span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Customer Details:</Form.Label>
                <Form.Control
                  placeholder="Enter Name"
                  // rows={3}
                  value={state.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={onchange}
                  autoComplete="name"
                  required={true}
                />
                {/* <Form.Label className="fw-bold">Customer Email:</Form.Label> */}
                <Form.Control
                  placeholder="Enter Email"
                  // rows={3}
                  value={state.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={onchange}
                  autoComplete="email"
                />
                {/* <Form.Label className="fw-bold">Customer Address:</Form.Label> */}
                <Form.Control
                  placeholder="Enter Address"
                  // rows={3}
                  value={state.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  onChange={onchange}
                  autoComplete="address "
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill Details:</Form.Label>
                <Form.Control
                  value={state.billFrom}
                  disabled={true}
                  className="my-2"
                />
                <Form.Control
                  value={state.billFromEmail}
                  disabled={true}
                  className="my-2"
                />
                <Form.Control
                  value={state.billFromAddress}
                  disabled={true}
                  className="my-2"
                />
              </Col>
              <hr className="my-4" />
            </Row>
            <InvoiceItem
              items={items}
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={state.currency}
            />
            <hr className="my-4" />
            <Col style={{ margin: "30px" }}>
              <Form.Label className="fw-bold">Extra Work:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Extra Work"
                value={state.extraWork}
                name="extraWork"
                className="my-2"
                onChange={onchange}
                required={true}
              />

              <Form.Label className="fw-bold">Scope of Work:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Scope of Work"
                value={state.purpose}
                name="purpose"
                className="my-2"
                onChange={onchange}
                required={true}
              />
            </Col>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Sub Total:</span>
                  <span>
                    {state.currency}
                    {state.subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    ({state.discountRate}%) {state.currency}
                    {state.discountAmount}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">GST:</span>
                  <span>
                    ({state.taxRate}%) {state.currency}
                    {state.taxAmount}
                  </span>
                </div>
                <div
                  className="d-flex flex-row align-items-start justify-content-between mt-2"
                  style={{ fontSize: "1.125rem" }}
                >
                  <span className="fw-bold">Total:</span>
                  <span>
                    {state.currency}
                    {total}
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100 mb-3"
              // onClick={() => setState((state) => ({ ...state, isOpen: true }))}
            >
              Review Invoice
            </Button>
            {/* <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(e) => onCurrencyChange({ currency: e.target.value })}
                className="btn btn-light my-1"
              >
                <option value="₹">INR</option>
                <option value="$">USD</option>
              </Form.Select>
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">GST Tax Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={state.taxRate}
                  onChange={onchange}
                  placeholder="0.00"
                  className="bg-white-border"
                  min="0.00"
                  step="0.01"
                  max="100.0"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Discount Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={state.discountRate}
                  onChange={onchange}
                  className="bg-white-border"
                  min="0.00"
                  step="0.01"
                  max="100.0"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <InvoiceModal
        showModal={state.isOpen}
        closeModal={() => setState((state) => ({ ...state, isOpen: false }))}
        info={state}
        items={items}
        total={total}
      />
    </Form>
  );
}
