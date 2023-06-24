import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  showDeleteButton = false;
  showEditButton = false;
  startX: number=0;
  isMoving = false;

  onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const mouseX = event.clientX - rect.left;

    if (mouseX < cardWidth - 50) {
      this.showDeleteButton = false;
    } else {
      this.showDeleteButton = true;
    }
    if (mouseX < cardWidth - 50) {
      this.showEditButton = false;
    } else {
      this.showEditButton = true;
    }
  }
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.isMoving = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isMoving) {
      return;
    }

    const card = event.currentTarget as HTMLElement;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;

    if (deltaX < -50) {
      this.showDeleteButton = true;
    } else if (deltaX > 50) {
      this.showDeleteButton = false;
    }
  }
  

  onTouchEnd(): void {
    this.isMoving = false;
  }

}
