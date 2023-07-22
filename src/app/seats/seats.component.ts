import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Seat {
  seatNumber: number;
  section: string;
  selected: boolean;
  rowLabel: string;
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

  constructor(private router:Router ) {
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
          seats.push({ seatNumber, section, rowLabel: `R ${i}`, selected: false, price });
          if (spaceAfter > 0 && j % spaceAfter === 0 && j !== seatsPerRow) {
            seats.push({ seatNumber: 0, section: '', rowLabel: '', selected: false, isSpace: true, price: 0 });
          }
        }
      }
      this.seatRows.push({ rowLabel: section, seats });
    }
  }

  toggleSeatSelection(rowIndex: number, seatIndex: number): void {
    if (!this.seatRows[rowIndex].seats[seatIndex].isSpace) {
      this.seatRows[rowIndex].seats[seatIndex].selected = !this.seatRows[rowIndex].seats[seatIndex].selected;
    }
  }

  onPay(): void {
    const selectedSeats = this.seatRows.flatMap(row => row.seats.filter(seat => seat.selected));

   
    let totalPrice = 0;
    const ticketTypesMap: { [key: string]: number } = {}; // To store the count of each ticket type
    for (const seat of selectedSeats) {
      totalPrice += seat.price;
      const ticketType = `${seat.section}-${seat.rowLabel}`;
      ticketTypesMap[ticketType] = (ticketTypesMap[ticketType] || 0) + 1;
    }

   
    const ticketTypes = Object.entries(ticketTypesMap).map(([type, count]) => `${type} (${count})`);

  
    const paymentData = {
      totalprice: totalPrice,
      ticketTypes: ticketTypes
    };

   if(paymentData.totalprice!=0){
    Swal.fire({
      title: 'Are you sure you wanted to procceed to Checkout?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
     
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.router.navigate(["/checkout"])
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
   
  }
   }
   
  
}
