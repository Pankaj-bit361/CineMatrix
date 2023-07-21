import { Component } from '@angular/core';

interface Seat {
  seatNumber: number;
  section: string;
  selected: boolean;
  isSpace?: boolean;
  price: number;
}

interface SeatRow {
  rowLabel: string;
  seats: Seat[];
}

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent {
  seatRows: SeatRow[] = [];

  constructor() {
    this.generateSeatLayout();
  }

  generateSeatLayout(): void {
    this.generateSectionSeats('D', 12, 6, 3, 500); // Diamond section with price 500
    this.generateSectionSeats('G', 30, 10, 0, 300); // Gold section with price 300
    this.generateSectionSeats('P', 42, 10, 0, 180); // Platinum section with price 180
  }

  generateSectionSeats(section: string, seatCount: number, seatsPerRow: number, spaceAfter: number, price: number): void {
    const rowCount = Math.ceil(seatCount / seatsPerRow);
    for (let i = 1; i <= rowCount; i++) {
      const seats: Seat[] = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatNumber = (i - 1) * seatsPerRow + j;
        if (seatNumber <= seatCount) {
          seats.push({ seatNumber, section, selected: false, price });
          if (spaceAfter > 0 && j % spaceAfter === 0 && j !== seatsPerRow) {
            seats.push({ seatNumber: 0, section: '', selected: false, isSpace: true, price: 0 });
          }
        }
      }
      this.seatRows.push({ rowLabel: section + ' - R ' + i, seats });
    }
  }

  toggleSeatSelection(rowIndex: number, seatIndex: number): void {
    if (!this.seatRows[rowIndex].seats[seatIndex].isSpace) {
      this.seatRows[rowIndex].seats[seatIndex].selected = !this.seatRows[rowIndex].seats[seatIndex].selected;
    }
  }
}
