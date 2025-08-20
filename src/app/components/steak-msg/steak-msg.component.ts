import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SteakState } from 'fowl/src/app/store/reducers/steak.reducer';
import {
  EmergencyContact,
  DeliveryVehicle,
  Steak,
  Identity,
  Theft,
  Unit
} from 'shared-model';
import { Utils } from 'shared-utils';
import { DatePipe } from '@angular/common';
import { createSteakNote } from 'fowl/src/app/store/actions/fowl-steak.actions';
import {sendMSG} from 'shared-store/steak';

@Component({
  selector: 'app-steak-msg',
  templateUrl: './steak-msg.component.html',
  styleUrls: ['./steak-msg.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteakSmsComponent {
  @Input() identity: Identity;
  @Input() angleMeasure = 'deg';
  @Input() selectedDeliveryVehicleEmergencyContacts: EmergencyContact[];
  @Input() set setSelectedDeliveryVehicle(deliveryVehicle: DeliveryVehicle) {
    if (deliveryVehicle) {
      this.selectedSteakDeliveryVehicle = deliveryVehicle;
      this.buildMessage();
    }
  }
  @Input() set setSelectedNonPhantomUnit(unit: Unit) {
    if (unit) {
      this.selectedSteakLatestNonPhantomUnit = unit;
      this.buildMessage();
    }
  }
  @Input() set selectedSteakEvent(steak: Steak) {
    if (
      steak &&
      (!this.selectedSteak || this.selectedSteak.steakId !== steak.steakId)
    ) {
      this.selectedSteak = steak;
      this.buildMessage();
    }
  }
  @Input() set selectedSteakTheft(theft: Theft) {
    if (
      theft &&
      (!this._selectedSteakTheft ||
        this._selectedSteakTheft.steakId !== theft.steakId)
    ) {
      this._selectedSteakTheft = theft;
      this.buildMessage();
    }
  }

  isMSGVisible = false;
  msgDetails = {
    source: 'Steak',
    messageType: 21,
    cellNo: '',
    message: '',
    steakId: 0,
    description: 'Steak MSG send to client',
  };

  selectedSteakDeliveryVehicle: DeliveryVehicle = null;
  selectedSteak: Steak = null;
  selectedSteakLatestNonPhantomUnit: Unit = null;
  _selectedSteakTheft: Theft = null;

  constructor(
    private steakStore: Store<SteakState>,
    private readonly store: Store,
    private datePipe: DatePipe
  ) {}

  sendMSGDisabled() {
    const regex = /(\+)?\d{10,13}/;
    return (
      this.msgDetails.message.length === 0 ||
      !this.msgDetails.cellNo.match(regex)
    );
  }

  handleMSGCancel() {
    this.isMSGVisible = false;
  }

  handleMSGOk() {
    if (this.msgDetails?.cellNo?.length > 2) {
      if (
        this.msgDetails.cellNo.indexOf('+') === -1 &&
        this.msgDetails.cellNo[0] === '0'
      ) {
        this.msgDetails.cellNo =
          '+27' +
          this.msgDetails.cellNo.slice(1, this.msgDetails.cellNo.length);
      } else if (this.msgDetails.cellNo.indexOf('27') === 0) {
        this.msgDetails.cellNo = '+' + this.msgDetails.cellNo;
      }

      this.msgDetails.cellNo += '|SVR';

      this.store.dispatch(sendMSG({ msgDetails: this.msgDetails }));

      if (
        this.identity &&
        this.identity.steakUserId &&
        this.selectedSteak.steakId &&
        this.selectedSteak.steakId > 0
      ) {
        this.steakStore.dispatch(
          createSteakNote({
            steakId: this.selectedSteak.steakId,
            remark: `${this.identity.username} sent the following MSG: ${this.msgDetails.message}`,
            userId: this.identity.steakUserId,
          })
        );
      }
    }

    this.isMSGVisible = false;
  }

  resetMessage() {
    this.msgDetails = {
      source: 'Steak',
      messageType: 21, // Donno
      cellNo: '',
      message: '',
      steakId: 0,
      description: 'Steak MSG send to client',
    };
  }

  coordinateToPreferenceString(lat: number, lon: number): string {
    if (this.angleMeasure === 'sec') {
      return `${Utils.calculateDegrees(lat)}° ${Utils.calculateMinutes(
        lat
      )}' ${Utils.calculateSeconds(lat)}" ${
        lat >= 0 ? 'N' : 'S'
      } ${Utils.calculateDegrees(lon)}° ${Utils.calculateMinutes(
        lon
      )}' ${Utils.calculateSeconds(lon)}" ${lon >= 0 ? 'E' : 'W'}`;
    } else if (this.angleMeasure === 'min') {
      return `${Utils.calculateDegrees(lat)}° ${Utils.calculateMinutes(
        lat,
        false
      )}' ${lat >= 0 ? 'N' : 'S'} ${Utils.calculateDegrees(
        lon
      )}° ${Utils.calculateMinutes(lon, false)}' ${lon >= 0 ? 'E' : 'W'}`;
    } else {
      return `${lat}, ${lon}`;
    }
  }

  buildMessage(): void {
    this.resetMessage();

    if (this.selectedSteakDeliveryVehicle && this.selectedSteakLatestNonPhantomUnit) {
      this.msgDetails.source = 'Steak';
      this.msgDetails.steakId = this.selectedSteak?.steakId;
      this.msgDetails.description = 'Steak MSG send to client.';

      if (this.selectedDeliveryVehicleEmergencyContacts?.length > 0) {
        this.msgDetails.cellNo =
          this.selectedDeliveryVehicleEmergencyContacts[0].telephone || '';
      }

      if (
        this.selectedSteakLatestNonPhantomUnit?.unitStatus?.position?.latitude &&
        this.selectedSteakLatestNonPhantomUnit?.unitStatus?.position?.longitude
      ) {
        this.msgDetails.message = `${
          this.selectedSteakLatestNonPhantomUnit?.description
        } ${
          this.selectedSteakLatestNonPhantomUnit?.obcModel
        } => ${this.coordinateToPreferenceString(
          this.selectedSteakLatestNonPhantomUnit?.unitStatus.position.latitude,
          this.selectedSteakLatestNonPhantomUnit?.unitStatus.position.longitude
        )}\n`;
      }

      this.msgDetails.message += `${this.selectedSteakDeliveryVehicle.deliveryVehicleRegistration}, ${this.selectedSteakDeliveryVehicle.deliveryVehicleMake}, ${this.selectedSteakDeliveryVehicle.deliveryVehicleModel}, ${this.selectedSteakDeliveryVehicle.deliveryVehicleColour},\n`;

      if (this.selectedSteakLatestNonPhantomUnit?.unitStatus) {
        this.msgDetails.message += `${
          this.selectedSteakLatestNonPhantomUnit?.unitStatus.position.location
        },\n${this.datePipe.transform(
          this.selectedSteakLatestNonPhantomUnit?.unitStatus.rtcDateTime,
          'dd/MM/yyyy HH:mm:ss'
        )}: ${this.selectedSteakLatestNonPhantomUnit?.unitStatus.deliveryVehicleStatus},\n`;
      }

      this.msgDetails.message += `${this.selectedSteakDeliveryVehicle.deliveryVehicleEngineNo},\n${this.selectedSteakDeliveryVehicle.deliveryVehicleChassisNo},\n`;

      if (this.selectedSteak?.entityName) {
        this.msgDetails.message += `${this.selectedSteak?.entityName},\n`;
      }

      this.msgDetails.message += `${this.selectedSteak?.classify},\n`;

      if (
        this._selectedSteakTheft &&
        this._selectedSteakTheft.steakId === this.selectedSteak.steakId
      ) {
        this.msgDetails.message += `${this.datePipe.transform(
          this._selectedSteakTheft.theftDateTime,
          'dd/MM/yyyy HH:mm:ss'
        )},\nActivation Location: ${
          this._selectedSteakTheft.theftLatitude
        } S X ${this._selectedSteakTheft.theftLongitude} E`;
      }
    }
  }
}
