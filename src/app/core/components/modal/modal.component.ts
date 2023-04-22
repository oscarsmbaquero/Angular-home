import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    private modalService: ModalService
  ) { }

  closeModal() {
    this.modalService.closeModal();
  }

}
