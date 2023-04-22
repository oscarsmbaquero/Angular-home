import { ModalComponent } from './../../components/modal/modal.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  openModal() {
    this.dialog.open(ModalComponent, {
      width: '500px',
      height: '500px',
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
