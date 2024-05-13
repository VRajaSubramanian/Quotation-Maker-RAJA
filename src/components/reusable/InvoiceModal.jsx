import { Modal, Row, Col, Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";
import html2pdf from "html2pdf.js";

export default function InvoiceModal(props) {
  const generateInvoice = () => {
    const element = document.querySelector("#invoiceCapture");
    const fileName = props.info.billTo ? `${props.info.billTo}.pdf` : "Quotation.pdf";
  
      const options = {
      margin: [220, 10, 60, 10], 
      filename: fileName,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      // Add pagebreak option to handle page breaks for table rows
      pagebreak: { mode: ['css'], avoid: ['table', 'thead', 'tfoot', 'tr', 'h2', 'h3','th','h6','h5','h1','h4','span','td'] },
      // Define header for all pages
      header: (currentPage, pageCount, html) => {
        return headerContent;
      }
    };
  
    html2pdf().set(options).from(element).save();
  };
  
  
  

  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
              <div className="headerPart"
          style={{
            border: "4px solid #836937", // Added border with gold color
            borderRadius: "25px", // Added border-radius for rounded corners
            padding: "20px",
            backgroundColor: "#1a2954",
            color: "#836937",
            fontFamily: "Times New Roman, serif",
            textAlign: "center",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "35px",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          >
            V.R.S. ELECTRICAL WORKS
          </h2>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            25-1, Parasakthi Building, Tirunelveli Junction.
          </p>
          <div>
            <span>
              <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                LICENCED ELECTRICAL WIRING CONTRACTORS
              </h3>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontWeight: "bold" }}>
                R. VELAYUDHAM
              </span>
              <span>98431 10609</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontWeight: "bold" }}>
                R. ARUMUGAM
              </span>
              <span>98433 35029</span>
            </div>
          </div>
        </div>
      <div id="invoiceCapture" style={{ fontFamily: "Times New Roman, serif" }}>
        {/* <div className="headerPart"
          style={{
            border: "4px solid #836937", // Added border with gold color
            borderRadius: "25px", // Added border-radius for rounded corners
            padding: "20px",
            backgroundColor: "#1a2954",
            color: "#836937",
            fontFamily: "Times New Roman, serif",
            textAlign: "center",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "35px",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          >
            V.R.S. ELECTRICAL WORKS
          </h2>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            25-1, Parasakthi Building, Tirunelveli Junction.
          </p>
          <div>
            <span>
              <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                LICENCED ELECTRICAL WIRING CONTRACTORS
              </h3>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontWeight: "bold" }}>
                R. VELAYUDHAM
              </span>
              <span>98431 10609</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontWeight: "bold" }}>
                R. ARUMUGAM
              </span>
              <span>98433 35029</span>
            </div>
          </div>
        </div> */}
        <div style={{ marginBottom: '50px', marginLeft: '50px', marginRight: '50px', paddingBottom: '50px' }}>
          <div className="p-4">
            <Row className="mb-4 justify-content-center">
              <Col md={8} className="text-center">
                <div style={{ fontWeight: "bold" }}>
                  {props.info.billTo || ""}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {props.info.billToAddress || ""}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {props.info.billToEmail || ""}
                </div>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr style={{ textAlign: "center", border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>S.NO</th>
                  <th style={{ border: "1px solid black" }}>NAME OF THE WORK</th>
                  <th style={{ border: "1px solid black" }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "justify" }}>
                {props.items.map((item, i) => (
                  <tr key={i} style={{ border: "1px solid black" }}>
                    <td style={{ width: "70px", border: "1px solid black" }}>{i + 1}</td>
                    <td style={{ border: "1px solid black" }}>
                      {item.name} - {item.description}
                    </td>
                    <td style={{ width: "100px", border: "1px solid black" }}>
                      {props.currency} {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-start">
              <h6
                className="fw-bold"
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                EXTRA WORK:
              </h6>
              <div>
                {props.info.extraWork.split("\n").map((line, index) => (
                  <div key={index} style={{ textAlign: "justify" }}>
                    <span>{index + 1}) <span style={{ marginLeft: '1.5rem' }}></span> </span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-start">
              <h6
                className="fw-bold"
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                SCOPE OF WORK:
              </h6>
              <div>
                {props.info.purpose.split("\n").map((line, index) => (
                  <div key={index} style={{ textAlign: "justify" }}>
                    <span>{index + 1}) <span style={{ marginLeft: '1.5rem' }}></span> </span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <Table>
              <tbody>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>Sub Total</td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency}
                    {props.info.subTotal}
                  </td>
                </tr>
                {props.info.taxAmount > 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>GST (+)</td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.info.currency}
                      {props.info.taxAmount}
                    </td>
                  </tr>
                )}
                {props.info.discountAmount > 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>Discount (-)</td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.info.currency}
                      {props.info.discountAmount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>Total</td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency}
                    {props.total}
                  </td>
                </tr>
              </tbody>
            </Table>

            {props.info.notes && (
              <div className="bg-light py-3 px-4 rounded">
                {props.info.notes}
              </div>
            )}
          </div>
          <div>
            <h6 className="text-center">Thanking You</h6>
            <div className="sign text-end">
              <h6>Yours Truly,</h6>
              <h5><b>R. Velayudham</b></h5>
              <div className="img">
                <img className="text-end" src="sign.png" alt="Signature" style={{ height: "30pt", width: "100pt" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="pb-4 px-4">
        <Button
          variant="primary"
          className="d-block w-100 mt-3 mt-md-0"
          onClick={generateInvoice}
        >
          Download Quotation
        </Button>
      </div>
    </Modal>
  );
}
