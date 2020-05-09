import React from "react";
import Modal from 'react-bootstrap/Modal';

const styles = {
  labels: {
    fontWeight: "bold",
    marginBottom: "15px",
    color: "white",
    fontFamily: "'Playfair Display SC', serif"
  },
  inputs: {
    marginBottom: "20px",
    width: "80%",
    borderRadius: "10px",
    paddingLeft: "10px",
    fontFamily: "'Gotu', sans-serif"
  },
  buttonSub: {
    marginTop: "30px",
    marginRight: "30px",
    width: "25%",
    color: "white",
    borderRadius: "5px",
    fontFamily: "'Playfair Display SC', serif",
    backgroundColor: "rgb(89, 89, 189)"
  },
  modal: {

  },
  modalHead: {
    color: "white"
  },
  modalFooter: {
    backgroundColor: "black"
  },
  modalTitle: {
    border: "1 solid black",
    fontFamily: "'Playfair Display SC', serif"
  }
}

function AccountingModal(props) {

  return (
    <Modal
      className="signmodal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={styles.modalHead} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 style={styles.modalTitle}>Add Budget Item</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modal}>
        <div className="col-md-12">
          <form className="new-item-accounting">
            <div className="row">
              <div className="col-md-4">
                <label className="lbl-new-item">Month</label><br></br>
                <select name="selectedMonth" className="dropdown-month" onChange={props.handleInputChange} value={props.selectedMonth}>
                  {props.months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select><br></br>
                <label className="lbl-new-item">Year</label><br></br>
                <select name="selectedYear" className="dropdown-month" onChange={props.handleInputChange} value={props.selectedYear}>
                  {props.tranYears.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select><br></br>
                <label className="lbl-new-item">Amount</label><br></br>
                <input name="tranAmount" className="input-new-item" type="text" onChange={props.handleInputChange} value={props.tranAmount} required></input>
              </div>
              <div className="col-md-6">
                <label className="lbl-new-item">Type</label><br></br>
                <select name="selectedType" className="dropdown-month" onChange={props.handleInputChange} value={props.selectedType} required>
                  {props.tranTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select><br></br>
                <label className="lbl-new-item">Description</label><br></br>
                <textarea name="tranDescr" className="text-new-item" onChange={props.handleInputChange} value={props.tranDescr} required></textarea><br></br>
                <input className="btn-submit-item" type="submit" value="submit" onClick={props.addAccountingItem}></input>
                <input className="btn-submit-item" type="submit" value="close" onClick={props.onHide}></input>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={styles.modalFooter}>

      </Modal.Footer>
    </Modal>
  );
}

export default AccountingModal;