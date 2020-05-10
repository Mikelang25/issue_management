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
    width: "100%",
    borderRadius: "10px",
    paddingLeft: "10px",
    fontFamily: "'Gotu', sans-serif",
    outline: "none"
  },
  descr:{
    marginBottom: "20px",
    width: "100%",
    height:"120px",
    borderRadius: "10px",
    paddingLeft: "10px",
    fontFamily: "'Gotu', sans-serif",
    outline: "none"
  },
  buttonSub: {
    marginTop: "30px",
    marginRight: "30px",
    width: "15%",
    color: "white",
    borderRadius: "5px",
    fontFamily: "'Playfair Display SC', serif",
    backgroundColor:"black",
    outline:"none"
  },
  modal: {
    backgroundImage: "URL('./dust_scratches.png')"
  },
  modalHead: {
    color: "white",
    backgroundColor:"black"
  },
  modalFooter: {
    backgroundColor: "black"
  },
  modalTitle: {
    border: "1 solid black",
    fontFamily: "'Playfair Display SC', serif",
    color: "black"
  },
  image:{
    marginRight:"10px"
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
        <Modal.Title>
          <h2><img style={styles.image} src="https://img.icons8.com/officel/48/000000/accounting.png"/>Add Budget Item</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modal}>
        <div className="col-md-12">
          <form style={styles.modal}>
            <div className="row">
              <div className="col-md-4">
                <label>Month</label><br></br>
                <select style={styles.inputs} name="selectedMonth" onChange={props.handleInputChange} value={props.selectedMonth}>
                  {props.months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select><br></br>
                <label>Year</label><br></br>
                <select style={styles.inputs} name="selectedYear" onChange={props.handleInputChange} value={props.selectedYear}>
                  {props.tranYears.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select><br></br>
                <label>Amount</label><br></br>
                <input style={styles.inputs} name="tranAmount" type="text" onChange={props.handleInputChange} value={props.tranAmount} required></input>
              </div>
              <div className="col-md-6">
                <label>Type</label><br></br>
                <select style={styles.inputs} name="selectedType" onChange={props.handleInputChange} value={props.selectedType} required>
                  {props.tranTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select><br></br>
                <label>Description</label><br></br>
                <textarea style={styles.descr} name="tranDescr" onChange={props.handleInputChange} value={props.tranDescr} required></textarea><br></br>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <input style={styles.buttonSub} type="submit" value="Submit" onClick={props.addAccountingItem}></input>
                <input style={styles.buttonSub} type="submit" value="Close" onClick={props.onHide}></input>
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