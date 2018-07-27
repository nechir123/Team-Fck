import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { InfoBox } from "../components/content/InfoBox";
import { Modal, openModal, closeModal } from "../components/content/Modal";
import { DtoRawMaterialItem } from "../model/dto/DtoRawMaterialItem";
import { Col, Row } from "react-bootstrap";

import {
  deleteRawMaterialItemSaga,
  saveRawMaterialItemsSaga
} from "../store/rawMaterialItems/actions";
import { RawMaterialItemView } from "./RawMaterialItemView/RawMaterialItemView";
import { getTransportCompaniesSaga } from "../store/transportCompanies/actions";
import {
  getTicketsSaga,
  onEditTicketRequested,
  saveTicketSaga
} from "../store/ticket/actions";
import {
  getWorkOrdersSaga,
  onEditWorkOrderRequested,
  saveWorkOrderSaga
} from "../store/workOrder/actions";
import { getCountriesSaga } from "../store/countries/actions";
import { getCompaniesSaga } from "../store/companies/actions";
import { getProductCardsSaga } from "../store/productCardItems/actions";
import { getUsersSaga } from "../store/users/actions";
import { getCategoriesSaga } from "../store/categories/actions";

import PropTypes from "prop-types";
import {
  getWorkingHoursSaga,
  startWorkRoleSaga,
  stopWorkRoleSaga
} from "../store/workRoles/actions";
import {
  workRoleAsString,
  workRoleAsValue,
  workRoleEnum
} from "../model/workRoleEnum";
import { DtoWorkingHour } from "../model/dto/DtoWorkingHour";
import { DtoRow } from "../model/dto/DtoRow";
import { WorkOrderList } from "./WorkOrderView/WorkOrderList";
import { DtoTicket } from "../model/dto/DtoTicket";
import DtoCompany from "../model/dto/DtoCompany";
import DtoUser from "../model/dto/DtoUser";
import { DtoWorkOrder } from "../model/dto/DtoWorkOrder";
import { workOrderStatusEnum } from "../model/workOrderStatusEnum";
import { TicketReaderForm } from "./TicketView/TicketReaderForm";
import { deleteProductSaga, saveProductSaga } from "../store/product/actions";
import { DtoProduct } from "../model/dto/DtoProduct";
import {
  EditTicketForm,
  EditTicketFormBase
} from "./TicketView/EditTicketForm";
import { ContainerReaderForm } from "./ProductContainerView/ContainerReaderForm";
import {
  getProductContainersSaga,
  onEditProductContainerRequested,
  saveProductContainerSaga
} from "../store/productContainers/actions";
import { EditProductContainerForm } from "./ProductContainerView/EditProductContainerForm";
import { DtoProductContainer } from "../model/dto/DtoProductContainer";

/**
 * Desktop view.
 */
export class DesktopViewBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowInEdit: new DtoRow(),
      activeWorkOrder: [],
      renderTicketReader: false,
      renderContainerReader: false
    };

    this.onSaveRow = this.onSaveRow.bind(this);
    this.onCancelRow = this.onCancelRow.bind(this);
    this.onCancelRawMaterialStatus = this.onCancelRawMaterialStatus.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onAddProductContainer = this.onAddProductContainer.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.startWorkRole = this.startWorkRole.bind(this);
    this.stopWorkRole = this.stopWorkRole.bind(this);

    this.onEditWorkOrder = this.onEditWorkOrder.bind(this);
    this.onCancelWorkOrder = this.onCancelWorkOrder.bind(this);
    this.onSaveWorkOrder = this.onSaveWorkOrder.bind(this);
    this.onOpenTicketReader = this.onOpenTicketReader.bind(this);
    this.onOpenContainerReader = this.onOpenContainerReader.bind(this);
    this.onOpenTicket = this.onOpenTicket.bind(this);
    this.onOpenContainer = this.onOpenContainer.bind(this);

    this.onDeleteProduct = this.onDeleteProduct.bind(this);
    this.onSaveProduct = this.onSaveProduct.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onSaveTicket = this.onSaveTicket.bind(this);
    this.onSaveContainer = this.onSaveContainer.bind(this);
    this.onCancelTicket = this.onCancelTicket.bind(this);
    this.onCancelContainer = this.onCancelContainer.bind(this);
    this.onCloseTicketReader = this.onCloseTicketReader.bind(this);
    this.onCloseContainerReader = this.onCloseContainerReader.bind(this);
  }

  componentDidMount() {
    this.props.loadUsers();
    this.props.loadCompanies();
    this.props.loadCountries();
    this.props.loadProductCards();
    this.props.loadCategories();
    this.props.loadTransportCompanies();
    this.props.loadTickets();
    this.props.loadWorkOrders();
    this.props.loadProductContainers();
    this.props.getWorkingHours();
  }

  onDeleteProduct(data) {
    this.props.deleteProduct(data);
  }

  onSaveProduct(data) {
    this.props.saveProduct(data);
  }

  onDeleteItem(data) {
    this.props.deleteUnit(data);
  }

  onSaveItem(data) {
    this.props.saveItems(data);
  }

  onCancelTicket() {
    this.props.onEditTicket(new DtoTicket());
  }

  onCancelContainer() {
    this.props.onEditProductContainer(new DtoProductContainer());
  }

  onSaveTicket(ticket, closeModalBool = true) {
    this.props.saveTicket(ticket, closeModalBool);
  }

  onSaveContainer(container: DtoProductContainer) {
    this.props.saveContainer(container);
  }

  onOpenTicket(ticket) {
    openModal("editTicket");
    this.props.onEditTicket(ticket);
  }

  onOpenContainer(container) {
    openModal("editContainer");
    this.props.onEditProductContainer(container);
  }

  onAddProductContainer(productContainer: DtoProductContainer) {
    this.props.onAddProductContainer(productContainer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workingHours.length > 0) {
      if (
        nextProps.workingHours[nextProps.workingHours.length - 1].StopTime ===
        null
      ) {
        this.filterWorkOrder(
          nextProps.workingHours[nextProps.workingHours.length - 1].Role,
          nextProps.workOrders
        );
      } else {
        this.filterWorkOrder(
          "invalidRoleForGettingNoRows",
          nextProps.workOrders
        );
      }
    }
  }

  onEditItem() {
    openModal("editItem");
  }

  onOpenTicketReader() {
    this.setState({ renderTicketReader: true });
    openModal("ticketReader");
  }

  onCloseTicketReader() {
    this.setState({ renderTicketReader: false });
  }

  onOpenContainerReader() {
    this.setState({ renderContainerReader: true });
    openModal("containerReader1");
  }

  onCloseContainerReader() {
    closeModal("containerReader1");
    this.setState({ renderContainerReader: false });
  }

  onCancelRawMaterialStatus() {
    closeModal("editItem");
  }

  onAddRow() {
    this.setState({ rowInEdit: new DtoRow() });
    openModal("editRow");
  }

  onCancelRow() {
    closeModal("editRow");
  }

  onSaveRow(row: DtoRow, qrCodes: Array<string>) {
    const grossWeight = row.GrossWeight;
    const tareWeight = row.TareWeight * row.NumberOfPackages;

    const netWeight = grossWeight - tareWeight;

    const units = [];
    qrCodes.forEach(value => {
      const tmpUnit = new DtoRawMaterialItem(row);

      tmpUnit.NetWeight = netWeight / qrCodes.length;
      tmpUnit.QrCodeValue = value;

      units.push(tmpUnit);
    });

    this.props.saveRawMaterialUnits(units);
  }

  onEditWorkOrder(workOrder: DtoWorkOrder) {
    this.props.onEditWorkOrder(workOrder);
  }

  onSaveWorkOrder(workOrder: DtoWorkOrder) {
    this.props.saveWorkOrder(workOrder);
  }
  onSaveProductContainer(container) {
    this.props.onSaveProductContainer(container);
  }

  onCancelWorkOrder() {
    this.props.onEditWorkOrder(new DtoWorkOrder());
    closeModal("editWorkOrder");
  }

  getLastWorkingHour() {
    let last = new DtoWorkingHour();

    if (this.props.workingHours.length > 0)
      last = this.props.workingHours[this.props.workingHours.length - 1];

    return last;
  }

  getWorkRoleToggleButtons() {
    const roles = [];
    const lastWorkingHour = this.getLastWorkingHour();

    for (const role in workRoleEnum) {
      if (role !== "NotSet" && role !== "Admin") {
        roles.push(
          <label
            key={role}
            onClick={() => this.startWorkRole(workRoleAsValue(role))}
            className={
              lastWorkingHour.Role === workRoleAsValue(role) &&
              lastWorkingHour.StopTime == null
                ? "btn btn-secondary active"
                : "btn btn-secondary"
            }
          >
            <input
              type="radio"
              name="options"
              id={`option${role}`}
              autoComplete="off"
            />{" "}
            {workRoleAsString(workRoleAsValue(role))}
          </label>
        );
      }
    }

    roles.push(
      <label
        key="stop"
        onClick={this.stopWorkRole}
        className={
          lastWorkingHour.StopTime != null
            ? "btn btn-secondary active"
            : "btn btn-secondary"
        }
      >
        <input type="radio" name="options" id="optionStop" autoComplete="off" />{" "}
        {"Stop"}
      </label>
    );

    return (
      <div className="btn-group btn-group" data-toggle="buttons">
        {roles}
      </div>
    );
  }

  startWorkRole(role) {
    const workingHour = new DtoWorkingHour();
    workingHour.UserId = this.props.loggedUser.UserId;
    workingHour.Role = role;
    workingHour.StartTime = new Date().toISOString();
    workingHour.StopTime = null;

    this.props.startWorkRole(workingHour);
  }

  stopWorkRole() {
    this.props.stopWorkRole();
  }

  filterWorkOrder(role, workOrders) {
    // TODO could maybe be done by using DxDataGrid internal filering method? Not sure how ever.
    const filteredWorkOrder = workOrders.filter(
      workOrder =>
        workOrder.Assignee === role &&
        workOrder.Status < workOrderStatusEnum.Done
    );
    this.setState({ activeWorkOrder: filteredWorkOrder });
  }

  getRawMaterialUnitUpdateModal() {
    if (!process.env.STORYBOOK_BUILD) {
      return (
        <Modal
          modalId="editItem"
          maxWidth="500px"
          content={
            <RawMaterialItemView
              onCancel={this.onCancelRawMaterialStatus}
              companies={this.props.companies}
            />
          }
        />
      );
    }
  }

  getEditTicketModalContent() {
    if (process.env.STORYBOOK_BUILD) {
      return (
        <EditTicketFormBase
          onDeleteProduct={this.onDeleteProduct}
          onSaveProduct={this.onSaveProduct}
          onDeleteRawMaterialItem={this.onDeleteItem}
          onSaveRawMaterialItem={this.onSaveItem}
          productContainers={this.props.productContainers}
          companies={this.props.companies}
          tickets={this.props.tickets}
          categories={this.props.categories}
          transportCompanies={this.props.transportCompanies}
          onSave={this.onSaveTicket}
          onCancel={this.onCancelTicket}
          ticketInEdit={this.props.ticketInEdit}
        />
      );
    }

    return (
      <EditTicketForm
        onDeleteProduct={this.onDeleteProduct}
        onSaveProduct={this.onSaveProduct}
        onAddProductContainer={this.onAddProductContainer}
        onDeleteRawMaterialItem={this.onDeleteItem}
        onSaveRawMaterialItem={this.onSaveItem}
        productContainers={this.props.productContainers}
        onOpenContainer={this.onOpenContainer}
        companies={this.props.companies}
        tickets={this.props.tickets}
        categories={this.props.categories}
        transportCompanies={this.props.transportCompanies}
        onSave={this.onSaveTicket}
        onCancel={this.onCancelTicket}
        ticketInEdit={this.props.ticketInEdit}
        productContainerInEdit={this.props.productContainerInEdit}
      />
    );
  }

  render() {
    const schedulerConfig = {
      dataSource: this.props.workingHours,
      textExpr: "Role",
      startDateExpr: "StartTime",
      endDateExpr: "StopTime",
      views: ["month", "week", "day"],
      currentView: "week",
      currentDate: Date.now(),
      height: 600,
      showAllDayPanel: false
    };

    const modalContent =
      this.state.renderTicketReader === true ? (
        <TicketReaderForm
          onCloseTicketReader={this.onCloseTicketReader}
          tickets={this.props.tickets}
          onOpenTicket={this.onOpenTicket}
        />
      ) : (
        <div />
      );

    const editTicketContent = this.getEditTicketModalContent();

    const containerReaderContent =
      this.state.renderContainerReader === true ? (
        <ContainerReaderForm
          onCloseContainerReader={this.onCloseContainerReader}
          productContainers={this.props.productContainers}
          onOpenContainer={this.onOpenContainer}
        />
      ) : (
        <div />
      );
    return (
      <InfoBox title="Desktop">
        <Row>
          <Col md={12} xs={12}>
            <button
              onClick={this.onOpenTicketReader}
              style={{ marginLeft: "5px", marginTop: "15px" }}
              className="btn btn-success"
            >
              Ticket reader
            </button>
            {/*
            <button
              onClick={this.onOpenContainerReader}
              style={{ marginLeft: "5px", marginTop: "15px" }}
              className="btn btn-success"
            >
              Product container reader
            </button>
            */}
            {/* <button
              onClick={this.onAddRow}
              style={{ marginLeft: "5px", marginTop: "15px" }}
              className="btn btn-success"
            >
              Add units
            </button>
            <button
              onClick={this.onEditUnit}
              style={{ marginLeft: "5px", marginTop: "15px" }}
              className="btn btn-success"
            >
              Update unit
            </button> */}
          </Col>
        </Row>
        <Row>
          <h4>Current work role</h4>
          <Col md={12} xs={12}>
            {this.getWorkRoleToggleButtons()}
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <WorkOrderList
              mode="minimal"
              companies={this.props.companies}
              workOrderInEdit={this.props.workOrderInEdit}
              onSave={this.onSaveWorkOrder}
              users={this.props.users}
              onCancel={this.onCancelWorkOrder}
              onDelete={null}
              tickets={this.props.tickets}
              workOrders={this.state.activeWorkOrder}
              loggedUser={this.props.loggedUser}
              onEdit={this.onEditWorkOrder}
              fromDesktop
            />
          </Col>
        </Row>
        {/*
        <Row>
          <h4>Working hours</h4>
          <DxScheduler config={schedulerConfig} />
        </Row> */}
        {/*
        <Modal
          modalId="editRow"
          maxWidth="500px"
          content={
            <EditRowForm
              onSave={this.onSaveRow}
              onCancel={this.onCancelRow}
              rowInEdit={this.state.rowInEdit}
            />
          }
        /> */}
        <Modal
          modalId="editTicket"
          maxWidth="1000px"
          content={editTicketContent}
        />

        <Modal modalId="ticketReader" maxWidth="500px" content={modalContent} />
        <Modal
          modalId="containerReader1"
          maxWidth="500px"
          content={containerReaderContent}
        />
        {this.getRawMaterialUnitUpdateModal()}
      </InfoBox>
    );
  }
}

DesktopViewBase.propTypes = {
  startWorkRole: PropTypes.func.isRequired,
  stopWorkRole: PropTypes.func.isRequired,
  workingHours: PropTypes.arrayOf(Object),
  tickets: PropTypes.arrayOf(Object),
  companies: PropTypes.arrayOf(Object),
  users: PropTypes.arrayOf(Object),
  workOrders: PropTypes.arrayOf(Object),
  onEditWorkOrder: PropTypes.func.isRequired,
  saveWorkOrder: PropTypes.func.isRequired,
  workOrderInEdit: PropTypes.objectOf(Object),
  productContainerInEdit: PropTypes.objectOf(Object),
  categories: PropTypes.arrayOf(Object),
  transportCompanies: PropTypes.arrayOf(Object),
  productContainers: PropTypes.arrayOf(Object)
};

DesktopViewBase.defaultProps = {
  workingHours: new DtoWorkingHour(),
  tickets: new DtoTicket(),
  companies: new DtoCompany(),
  users: new DtoUser(),
  workOrders: new DtoWorkOrder(),
  workOrderInEdit: new DtoWorkOrder(),
  productContainerInEdit: new DtoProductContainer(),
  ticketInEdit: new DtoTicket()
};

const mapStateToProps = state =>
  state.workOrders
    .get("workOrdersData")
    .merge({ loggedUser: state.authentication.get("loggedUser") })
    .merge({ workRoleInEdit: state.workRoles.get("workRoleInEdit") })
    .merge({ ticketInEdit: state.tickets.get("ticketInEdit") })
    .merge({ workingHours: state.workRoles.get("workingHours") })
    .merge(state.workOrders.get("workOrdersData"))
    .merge(state.categories.get("categoriesData"))
    .merge(state.transportCompanies.get("transportCompaniesData"))
    .merge({ workOrderInEdit: state.workOrders.get("workOrderInEdit") })
    .merge({
      productContainerInEdit: state.productContainers.get(
        "productContainerInEdit"
      )
    })
    .merge(state.companies.get("companiesData"))
    .merge(state.productContainers.get("productContainersData"))
    .merge(state.users.get("usersData"))
    .merge(state.tickets.get("ticketsData"))
    .toJS();

const mapDispatchToProps = dispatch => ({
  saveRawMaterialItems(items: Array<DtoRawMaterialItem>) {
    dispatch(saveRawMaterialItemsSaga(items));
  },
  loadUsers() {
    dispatch(getUsersSaga());
  },
  loadCompanies() {
    dispatch(getCompaniesSaga());
  },
  loadCountries() {
    dispatch(getCountriesSaga());
  },
  loadProductCards() {
    dispatch(getProductCardsSaga());
  },
  loadProductContainers() {
    dispatch(getProductContainersSaga());
  },
  loadCategories() {
    dispatch(getCategoriesSaga());
  },
  loadTransportCompanies() {
    dispatch(getTransportCompaniesSaga());
  },
  loadTickets() {
    dispatch(getTicketsSaga());
  },
  loadWorkOrders() {
    dispatch(getWorkOrdersSaga());
  },
  startWorkRole(workingHour: DtoWorkingHour) {
    dispatch(startWorkRoleSaga(workingHour));
  },
  stopWorkRole() {
    dispatch(stopWorkRoleSaga());
  },
  getWorkingHours() {
    dispatch(getWorkingHoursSaga());
  },
  onEditWorkOrder(workOrder) {
    openModal("editWorkOrder");
    dispatch(onEditWorkOrderRequested(workOrder));
  },
  saveWorkOrder(workOrder) {
    closeModal("editWorkOrder");
    dispatch(saveWorkOrderSaga(workOrder));
    dispatch(onEditWorkOrderRequested(new DtoWorkOrder()));
  },
  onEditTicket(ticket: DtoTicket) {
    dispatch(onEditTicketRequested(ticket));
  },
  onEditProductContainer(container: DtoProductContainer) {
    dispatch(onEditProductContainerRequested(container));
  },
  onAddProductContainer(container: DtoProductContainer) {
    openModal("editProductContainer");
    dispatch(onEditProductContainerRequested(container));
  },
  saveTicket(ticket: DtoTicket, modalCloseRequested) {
    dispatch(saveTicketSaga(ticket));
    if (modalCloseRequested) {
      closeModal("editTicket");
      dispatch(onEditTicketRequested(new DtoTicket()));
    }
  },
  saveContainer(container: DtoProductContainer) {
    dispatch(saveProductContainerSaga(container));
  },
  saveItems(items: Array<DtoRawMaterialItem>) {
    dispatch(saveRawMaterialItemsSaga(items));
  },
  deleteItem(item: DtoRawMaterialItem) {
    dispatch(deleteRawMaterialItemSaga(item));
  },
  saveProduct(product: DtoProduct) {
    dispatch(saveProductSaga(product));
  },
  deleteProduct(product: DtoProduct) {
    dispatch(deleteProductSaga(product));
  }
});

export const DesktopView = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopViewBase);
